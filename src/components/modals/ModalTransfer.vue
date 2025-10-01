<template>
  <ModalLayout>
    <div>
      <ModalHeader :icon="MoveSVG" :title="props.title"></ModalHeader>
      <div class="vuefinder__move-modal__content">
        <p class="vuefinder__move-modal__description">{{ props.body }}</p>
        <div class="vuefinder__move-modal__files vf-scrollbar">
          <div v-for="node in items" class="vuefinder__move-modal__file">
            <div>
              <svg v-if="node.type === 'dir'" class="vuefinder__move-modal__icon vuefinder__move-modal__icon--dir" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <svg v-else class="vuefinder__move-modal__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="vuefinder__move-modal__file-name">{{ node.path }}</div>
          </div>
        </div>
        <h4 class="vuefinder__move-modal__target-title">{{ t('Target Directory') }}</h4>
        <p class="vuefinder__move-modal__target-directory">
          <svg xmlns="http://www.w3.org/2000/svg" class="vuefinder__move-modal__icon vuefinder__move-modal__icon--dir" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <span class="vuefinder__move-modal__target-path">{{ target.path }}</span>
        </p>
        <message v-if="message.length" @hidden="message=''" error>{{ message }}</message>
      </div>
    </div>

    <template v-slot:buttons>
      <button type="button" @click="transfer" class="vf-btn vf-btn-primary">{{ props.successBtn }}</button>
      <button type="button" @click="app.modal.close()" class="vf-btn vf-btn-secondary">{{ t('Cancel') }}</button>
      <div class="vuefinder__move-modal__selected-items">{{ t('%s item(s) selected.', items.length) }}</div>
    </template>
  </ModalLayout>
</template>

<script setup>
import ModalLayout from './ModalLayout.vue';
import {inject, ref} from 'vue';
import Message from '../Message.vue';
import ModalHeader from "./ModalHeader.vue";
import MoveSVG from "@/assets/icons/move.svg";

const app = inject('ServiceContainer');
const {t} = app.i18n;

const props = defineProps({
  q: {
    type: String,
    default: 'move'
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  successBtn: {
    type: String,
    required: true,
  },
  successText: {
    type: String,
    required: true,
  }
})

const items = ref(app.modal.data.items.from);
const target = app.modal.data.items.to
const message = ref('');

const transfer = () => {
  if (items.value.length) {
    app.emitter.emit('vf-fetch', {
      params: {
        q: props.q,
        m: 'post',
        adapter: app.fs.adapter,
        path: app.fs.data.dirname,
      },
      body: {
        items: items.value.map(({path, type}) => ({path, type})),
        item: target.path
      },
      onSuccess: () => {
        app.emitter.emit('vf-toast-push', {label: props.successText});
      },
      onError: (e) => {
        message.value = t(e.message);
      }
    });
  }
};

</script>
