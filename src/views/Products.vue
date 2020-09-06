<template>
  <div id="app" class="container">
    <product-modal :product="product" v-if="showModal" v-on:close="showModal = false" class="overlay"></product-modal>
    <!--    <button id="show-modal" v-on:click="showModal = true">Show Modal</button>-->
    <!--    <testmodal v-if="showModal" v-on:close="showModal = false" class="overlay">-->
    <!--      <h3 slot="header">custom header</h3>-->
    <!--    </testmodal>-->
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
      isLoading: true,
      modalOpen: false,
      showModal: false,
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
      this.showModal = true
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
      this.axios.post(`https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/ec/shopping`, {
        product: product.id,
        quantity: quantity
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err)
        })
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
