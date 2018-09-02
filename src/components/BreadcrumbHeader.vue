<template>
  <div class="vuefinder-header">
    <div class="vuefinder-breadcrumb">
      <div 
        class="vuefinder-breadcrumb-item" 
        @click="$emit('openFolder',root)"
      >
        <span class="icon">
          <font-awesome-icon icon="home" />
        </span>
      </div>
    </div>
    <div 
      v-for="(item, index) of breadcrumb" 
      :key="index" 
      class="vuefinder-breadcrumb"
    >
      <div 
        class="vuefinder-breadcrumb-item" 
        @click="$emit('openFolder',item.dirname)"
      >
        <span v-if="item.length != 0">
          {{ item.basename }}
        </span>
      </div>
    </div>
    <div 
      v-show="loading" 
      class="vuefinder-loader"
    >
      <span class="icon">
        <font-awesome-icon 
          icon="spinner" 
          spin
        />
      </span>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
    name: 'BreadcrumbHeader',
    components: { FontAwesomeIcon },
    props:{
        root: {
            type: String,
            required: true
        },
        dirname: {
            type: String,
            required: true
        },
        loading: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        breadcrumb: function () {
            let items = [], links = [],
                root = '^' + this.root.replace(/([^\w ])/, '\\$1') + '\/?',
                regex = new RegExp(root, 'i'),
                path = this.dirname.replace(regex, '');

            if (path.length == 0) {
                return [];
            }
            path.split('/')
                .forEach(function (item) {
                    items.push(item);
                    if (items.join('/') != '') {
                        links.push({
                            'basename': item,
                            'dirname': items.join('/'),
                            'type': 'folder'
                        });
                    }
                });
            return links;
        }
    }
};
</script>

<style lang="scss" scoped>
.vuefinder-header {
  display: flex;
  font-size: 14px;
  font-weight: bold;
  flex-wrap: wrap;
  padding: 10px;

  .vuefinder-loader {
    flex: 1;
    text-align: right;
    display: flex;
    flex-direction: row-reverse;
    .icon {
      font-size: 1.2rem;
    }
  }

  .vuefinder-breadcrumb {
    display: flex;
    height: 25px;
    line-height: 28px;

    .vuefinder-breadcrumb-item {
      display: flex;
      padding-left: 5px;
      padding-right: 5px;
      cursor: pointer;
      transition: 0.2s;
      .icon {
        font-size: 1.5rem;
      }
    }
  }
  .vuefinder-breadcrumb + .vuefinder-breadcrumb::before {
    content: " / ";
  }
}
</style>