<template>
  <div id="app" class="container">
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
            <product-modal v-model="modalOpen" :product="product" v-on:close-modal="reverseModalState"></product-modal>
            <button type="button" class="btn btn-outline-secondary btn-sm" v-on:click="getProductDetail(product.id)">
              查看更多
            </button>
            <!--            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" v-on:click="addToCart(product)">-->
            <!--              加到購物車-->
            <!--            </button>-->
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
      isLoading: true,
      modalOpen: false,
      products: [],
      product: {}
    }
  },
  created () {
    this.axios.get(`https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/ec/products`)
      .then(res => {
        this.isLoading = false
        this.products = res.data.data
      })
      .catch(err => {
        console.error(err)
      })
  },
  mounted () {

  },
  methods: {
    getProductDetail (productId) {
      this.reverseModalState()
      // this.isLoading = true
      // this.axios.get(`https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/ec/product/${productId}`)
      //   .then(res => {
      //     this.isLoading = false
      //     this.product = res.data.data
      //     this.product.num = 0
      //     // this.$('#productModal').modal('show')
      //     this.reverseModalState()
      //     console.log(this.modalOpen)
      //   })
      //   .catch(err => {
      //     console.error(err)
      //   })
    },
    addToCart (product, quantity = 1) {
      product.num = quantity
      this.$bus.$emit('addToCart', JSON.parse(JSON.stringify(product)))
    },
    deleteItem (itemIndex) {
      this.shoppingList.splice(itemIndex, 1)
    },
    reverseModalState () {
      console.log(this.modalOpen)
      this.modalOpen = !this.modalOpen
    }
  }
}
</script>

<style scoped>

</style>
