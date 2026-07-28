---
outline: deep
---

# Notifications

Example showing how to:

- Toggle built-in toast notifications
- Customize toast position and duration
- Listen to `@notify` events for external UI/logging

## Live Demo

<ClientOnly>
  <NotificationsDemo />
</ClientOnly>

## Code Example

```vue
<template>
  <div class="notify-example">
    <vue-finder id="notify-demo" :driver="driver" :config="config" @notify="handleNotify" />

    <div class="notify-example__bottom">
      <section class="notify-example__card">
        <h3 class="notify-example__title">Notification Settings</h3>

        <label class="notify-example__field notify-example__field--inline">
          <input v-model="notificationsEnabled" type="checkbox" />
          Enable toasts
        </label>

        <label class="notify-example__field">
          <span>Position</span>
          <select v-model="notificationPosition" class="notify-example__input">
            <option value="top-left">top-left</option>
            <option value="top-center">top-center</option>
            <option value="top-right">top-right</option>
            <option value="bottom-left">bottom-left</option>
            <option value="bottom-center">bottom-center</option>
            <option value="bottom-right">bottom-right</option>
          </select>
        </label>

        <label class="notify-example__field">
          <span>Duration (ms)</span>
          <input v-model.number="notificationDuration" class="notify-example__input" type="number" min="500" step="250" />
        </label>

        <button @click="clearNotifyEvents">Clear event log</button>
      </section>

      <section class="notify-example__card notify-example__card--log">
        <h3 class="notify-example__title">@notify event log</h3>
        <div v-if="notifyEvents.length === 0">No notifications yet.</div>
        <div v-for="(entry, index) in notifyEvents" :key="`${entry.at}-${index}`">
          <small>{{ entry.at }} · {{ entry.type }}</small>
          <div>{{ entry.message }}</div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { RemoteDriver } from 'vuefinder';

const driver = new RemoteDriver({ baseURL: '/api' });

const notificationsEnabled = ref(true);
const notificationPosition = ref('bottom-center');
const notificationDuration = ref(3000);
const notifyEvents = ref([]);

const config = computed(() => ({
  notificationsEnabled: notificationsEnabled.value,
  notificationPosition: notificationPosition.value,
  notificationDuration: Number(notificationDuration.value) || 3000,
}));

const handleNotify = ({ type, message }) => {
  notifyEvents.value.unshift({ type, message, at: new Date().toLocaleTimeString() });
  notifyEvents.value = notifyEvents.value.slice(0, 20);
};

const clearNotifyEvents = () => {
  notifyEvents.value = [];
};
</script>
```

## Notes

- `@notify` emits `{ type, message }` even when `notificationsEnabled` is `false`.
- `notificationsEnabled` controls only toast rendering.
- `notificationsEnabled` is non-persistent, so the `:config` value always applies — even with `persist: true` it is never overridden by a localStorage value.
- This is useful when you want to render notifications in your own custom UI.

See:

- [Guide - Configuration](../guide/configuration.md)
- [Guide - Events](../guide/events.md)
- [API Reference - Events](../api-reference/events.md)
