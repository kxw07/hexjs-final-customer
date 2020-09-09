<template>
  <div id="app" class="container">
    <product-modal :product="product" v-if="showModal" v-on:close="showModal = false"
                   v-on:addToCart="addToCart"></product-modal>
    <div class="row mt-4">
      <div v-for="product in products" :key="product.id" class="col-md-4 mb-4">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center"
               :style="{backgroundImage: `url(${product.imageUrl})`}"></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ product.category }}</span>
            <h5 class="card-title">{{ product.title }}</h5>
            <p class="card-text">{{ product.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div v-if="!product.price" class="h5">
                {{ product.origin_price }} 元
              </div>
              <div v-else>
                <del class="h6">原價 {{ product.origin_price }} 元</del>
                <div class="h5">
                  現在只要 {{ product.price }} 元
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm" v-on:click="getProductDetail(product.id)">
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" v-on:click="addToCart(product)">
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productModal from '@/components/ProductModal'

export default {
  name: 'Products',
  components: {
    productModal
  },
  data () {
    return {
      showModal: false,
      products: [],
      product: {}
    }
  },
  created () {
    this.getProductList()
  },
  mounted () {},
  methods: {
    getProductList () {
      const loading = this.$loading.show()

      this.axios.get(`https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/ec/products`
      ).then(res => {
        this.products = res.data.data
        loading.hide()
      }).catch(err => {
        console.error(err)
        loading.hide()
      })
    },
    getProductDetail (productId) {
      const loading = this.$loading.show()

      this.axios.get(`https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/ec/product/${productId}`
      ).then(res => {
        this.product = res.data.data
        this.product.num = 0
        this.showModal = true

        loading.hide()
      }).catch(err => {
        console.error(err)
        loading.hide()
      })
    },
    addToCart (product, quantity = 1) {
      this.axios.delete(`https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/ec/shopping/${product.id}`
      ).then(res => {
        console.log(res)

        this.axios.post(`https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/ec/shopping`, {
          product: product.id,
          quantity: quantity
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.error(err)
        })
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
