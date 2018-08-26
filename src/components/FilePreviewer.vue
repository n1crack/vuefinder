<template>
  <div class="vuefinder-file-previewer">
    <component 
      :is="preview[type] || preview['default']" 
      :url="url" 
      :path="path"
    />
    <slot />
  </div>
</template>

<script>
import axios from 'axios';

var preview = {
    'default': {
        template: `
                    <div>no preview</div>
            `
    },
    'file-image': {
        props: ['url', 'path'],
        template: `
                <img :src="url+'&path='+encodeURIComponent(path)" />
            `
    },
    'file-alt': {
        props: ['url', 'path'],
        template: `
                <div class='vuefinder-text-preview'>{{ content }}</div>
            `,
        data () {
            return {
                content: ''
            };
        },
        mounted () {
            axios(this.url, { params: { path: this.path } })
                .then(response => {
                    this.content = response.data;
                });
        }
    },
    'file-video': {
        props: ['url', 'path'],
        template: `
                <video width="100%" height="100%" controls>
                    <source :src="url+'&path='+encodeURIComponent(this.path)" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `
    },
    'file-audio': {
        props: ['url', 'path'],
        template: `
                <audio controls>
                    <source :src="url+'&path='+encodeURIComponent(this.path)" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            `
    }
};

export default {
    name: 'FilePreviewer',
    props:{
        url: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            preview: preview
        };
    }
};
</script>

<style lang="scss" scoped>
.vuefinder-file-previewer {
  display: flex;
  margin-bottom: 1em;
  max-height: 200px;

  #{"/deep/"} .vuefinder-text-preview {
    background-color: whitesmoke;
    color: #4a4a4a;
    font-size: 0.875em;
    overflow-x: auto;
    max-width: 800px;
    padding: 1.1em 1.2rem;
    white-space: pre-line;
    word-wrap: break-word;
    border: 1px solid lightgray;
    user-select: text;
    width: 100%;
  }

  #{"/deep/"} img,
  embed,
  object,
  audio,
  video {
    max-width: 100%;
    max-height: 180px;
  }

  #{"/deep/"} img {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: auto;
    object-fit: contain;
  }
}
</style>