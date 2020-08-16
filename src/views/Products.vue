<template>
  <div id="app" class="container">
    <div class="row mt-4">
      <div v-for="item in products" :key="item.id" class="col-md-4 mb-4">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center"
               :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div v-if="!item.price" class="h5">
                {{ item.origin_price }} 元
              </div>
              <div v-else>
                <del class="h6">原價 {{ item.origin_price }} 元</del>
                <div class="h5">
                  現在只要 {{ item.price }} 元
                </div>
              </div>
            </div>
          </div>
          <!--          <div class="card-footer d-flex">-->
          <!--            <button type="button" class="btn btn-outline-secondary btn-sm" v-on:click="getProductDetail(item.id)">-->
          <!--              查看更多-->
          <!--            </button>-->
          <!--            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" v-on:click="addToCart(item)">-->
          <!--              加到購物車-->
          <!--            </button>-->
          <!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data () {
    return {
      uuid: 'de4aaa47-9e6a-44fb-be33-178ff34efbdc',
      isLoading: true,
      products: [],
      product: {}
    }
  },
  created () {
    this.axios.get(`https://course-ec-api.hexschool.io/api/${this.uuid}/ec/products`)
      .then(res => {
        this.isLoading = false
        this.products = res.data.data
      })
      .catch(err => {
        console.err(err)
      })
  },
  mounted () {

  },
  methods: {
    getProductDetail (productId) {
      this.isLoading = true
      this.axios.get(`https://course-ec-api.hexschool.io/api/${this.uuid}/ec/product/${productId}`)
        .then(res => {
          this.isLoading = false
          this.product = res.data.data
          this.product.num = 0
          this.$('#productModal').modal('show')
        })
        .catch(err => {
          console.err(err)
        })
    },
    addToCart (product, quantity = 1) {
      product.num = quantity
      this.$bus.$emit('addToCart', JSON.parse(JSON.stringify(product)))
    },
    deleteItem (itemIndex) {
      this.shoppingList.splice(itemIndex, 1)
    }
  }
}
</script>

<style scoped>

</style>
