<template>
  <modal name="productModal" height="auto" :clickToClose="false">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-header">
              <slot name="header">
                <h5 class="modal-title">{{ product.title }}</h5>
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                <div style="height: 200px; background-size: cover; background-position: center"
                     :style="style"></div>
                <blockquote class="blockquote mt-3">
                  <p class="mb-0" v-html="product.content"></p>
                  <footer class="blockquote-footer text-right">
                    {{ product.description }}
                  </footer>
                </blockquote>
                <div class="d-flex justify-content-between align-items-baseline">
                  <div v-if="!product.price" class="h4">
                    {{ product.origin_price }} 元
                  </div>
                  <del v-if="product.price" class="h6">原價 {{ product.origin_price }} 元</del>
                  <div v-if="product.price" class="h4">
                    現在只要 {{ product.price }} 元
                  </div>
                </div>

                <select v-model="product.num" name class="form-control mt-3">
                  <option value="0" disabled selected>
                    請選擇數量
                  </option>
                  <option v-for="num in 5" :key="num" :value="num">
                    選購 {{ num }} {{ product.unit }}
                  </option>
                </select>
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <button class="btn btn-secondary" v-on:click="$emit('close')">
                  關閉
                </button>
                <button class="btn btn-primary" v-on:click="addToCart(product)">
                  加到購物車
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </modal>
</template>

<script>
export default {
  name: 'ProductModal',
  data () {
    return {}
  },
  props: {
    product: {}
  },
  created () {
  },
  mounted () {
    this.$modal.show('productModal')
  },
  computed: {
    style () {
      return `backgroundImage: url(${this.product.imageUrl})`
    }
  },
  methods: {
    addToCart (product) {
      console.log('modal addToCart', product)
      this.$emit('addToCart', product, product.num)
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
</style>
