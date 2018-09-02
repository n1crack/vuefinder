<template>
  <transition 
    name="vuefinder-modal" 
    tag="div"
  >
    <div class="vuefinder-modal-mask">
      <div 
        class="vuefinder-modal-wrapper" 
        @click.self="close()"
      >
        <div class="vuefinder-modal-container">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
    name: 'Modal',
    mounted: function () {
        document.addEventListener('keyup', (e) => {
            if (e.keyCode == 27) {
                this.close();
            }
        });
    },
    methods: {
        close () {
            this.$emit('close');
        }
    },
};
</script>

<style lang="scss" scoped>
.vuefinder-modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.vuefinder-modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.vuefinder-modal-container {
  box-sizing: border-box;
  width: 60%;
  margin: 0px auto;
  padding: 20px 30px;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

#{"/deep/"} .vuefinder-modal-header {
  margin-top: 0;
}

#{"/deep/"} .vuefinder-modal-body {
  margin: 20px 0;
  max-height: 350px;
  overflow: auto;
  word-break: break-all;
}

#{"/deep/"} .vuefinder-fade-enter-active {
  transition: opacity 0.5s;
}

#{"/deep/"} .vuefinder-fade-enter, #{"/deep/"} .vuefinder-fade-leave-to /* .list-leave-active below version 2.1.8 */
 {
  opacity: 0;
}

#{"/deep/"} .vuefinder-modal-body input {
  width: 80%;
  flex: 1;
  user-select: text;
  -moz-user-select: text;
  -webkit-user-select: text;
  -ms-user-select: text;
}

#{"/deep/"} .vuefinder-modal-default-button {
  float: right;
}

.vuefinder-modal-enter .vuefinder-modal-container,
.vuefinder-modal-leave-active .vuefinder-modal-container {
  transform: scale(1.1);
}

.vuefinder-modal-enter,
.vuefinder-modal-leave-to {
  opacity: 0;
}

@media screen and (max-width: 768px) {
  #{"/deep/"} .vuefinder-modal-container {
    width: 95%;
  }
}
</style>