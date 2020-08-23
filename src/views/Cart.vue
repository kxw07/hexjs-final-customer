<template>
  <div id="app" class="container">
    <div class="my-5 row justify-content-center">
      <div class="col-md-8">
        <div class="text-right mb-2">
          <button type="button" v-on:click="deleteAllItem()" class="btn btn-outline-danger btn-sm">刪除全部
          </button>
        </div>
        <table class="table">
          <thead>
          <tr>
            <th>-</th>
            <th>#</th>
            <th>品名</th>
            <th width="150px">數量</th>
            <th>單位</th>
            <th>單價</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in shoppingList" :key="item.product.id">
            <td class="align-middle">
              <button type="button" v-on:click="deleteItem(item, index)"
                      class="btn btn-outline-danger btn-sm">刪除
              </button>
            </td>
            <td class="align-middle">{{ index + 1 }}</td>
            <td class="align-middle">{{ item.product.title }}</td>
            <td class="align-middle">
              <div class="input-group">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-primary" v-on:click="addItemQuantity(item, 1)">+</button>
                </div>
                <input id="inlineFormInputGroupUsername" type="text" class="form-control text-center"
                       :value="item.quantity">
                <div class="input-group-append">
                  <button class="btn btn-outline-primary" v-on:click="addItemQuantity(item, -1)"
                          :disabled="item.quantity <= 1">-
                  </button>
                </div>
              </div>
            </td>
            <td class="align-middle">{{ item.product.unit }}</td>
            <td class="align-middle text-right">{{ item.product.price }}</td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <td colspan="5" class="text-right">
              總計
            </td>
            <td class="text-right">
              {{ calculateTotalPrice }}
            </td>
          </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="my-5 row justify-content-center">
      <ValidationObserver v-slot="{ invalid }" class="col-md-6">
        <form v-on:submit.prevent="sendOrder">
          <div class="form-group">
            <ValidationProvider rules="required" v-slot="{ errors, classes, passed }">
              <label for="username">姓名</label>
              <input id="username" type="text" name="姓名" v-model="username" class="form-control" :class="classes">
              <span class="invalid-feedback">{{ errors[0] }}</span>
              <span v-if="passed">檢查通過</span>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <ValidationProvider rules="required|email" v-slot="{ errors, classes, passed }">
              <label for="email">Email</label>
              <input id="email" type="email" name="Email" v-model="email" class="form-control" :class="classes">
              <span class="invalid-feedback">{{ errors[0] }}</span>
              <span v-if="passed">檢查通過</span>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <ValidationProvider rules="required|numeric|min:9" v-slot="{errors, classes, passed}">
              <label for="tel">聯絡電話</label>
              <input id="tel" type="tel" name="聯絡電話" v-model="tel" class="form-control" :class="classes">
              <span class="invalid-feedback">{{ errors[0] }}</span>
              <span v-if="passed">檢查通過</span>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <ValidationProvider rules="required" v-slot="{errors, classes, passed}">
              <label for="address">寄件地址</label>
              <input id="address" type="text" name="寄件地址" v-model="address" class="form-control" :class="classes">
              <span class="invalid-feedback">{{ errors[0] }}</span>
              <span v-if="passed">檢查通過</span>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <ValidationProvider rules="required" v-slot="{errors, classes, passed}">
              <label for="payMethod">付款方式</label>
              <select id="payMethod" name="付款方式" v-model="payMethod" class="form-control" :class="classes">
                <option disabled value="">請選擇付款方式</option>
                <option>WebATM</option>
                <option>ATM</option>
                <option>Barcode</option>
                <option>Credit</option>
                <option>ApplePay</option>
                <option>GooglePay</option>
              </select>
              <span class="invalid-feedback">{{ errors[0] }}</span>
              <span v-if="passed">檢查通過</span>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <ValidationProvider>
              <label for="coupon">優惠券</label>
              <input id="coupon" name="優惠券" v-model="coupon" cols="30" row="3" class="form-control">
            </ValidationProvider>
          </div>

          <div class="form-group">
            <ValidationProvider>
              <label for="message">備註</label>
              <textarea id="message" name="備註" v-model="message" cols="30" row="3" class="form-control">
              </textarea>
            </ValidationProvider>
          </div>

          <div class="text-right">
            <button type="submit" :disabled="invalid" class="btn btn-primary">Send</button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  name: 'Cart',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      shoppingList: [],
      totalPrice: 0,
      email: '',
      username: '',
      tel: '',
      address: '',
      payMethod: '',
      coupon: '',
      message: ''
    }
  },
  created () {
    this.getCartList()
  },
  computed: {
    calculateTotalPrice () {
      return this.shoppingList.length === 0 ? 0 : this.shoppingList.reduce((totalPrice, item) => {
        return totalPrice + item.product.price * item.quantity
      }, 0)
    }
  },
  methods: {
    getCartList () {
      const loader = this.$loading.show()
      this.axios.get(`https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/ec/shopping`)
        .then(res => {
          this.shoppingList = res.data.data
          loader.hide()
        })
        .catch(err => {
          console.error(err)
        })
    },
    deleteAllItem () {
      const loader = this.$loading.show()
      this.axios.delete(`https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/ec/shopping/all/product`)
        .then(res => {
          this.shoppingList = []
          console.log(res)
          loader.hide()
        })
        .catch(err => {
          console.error(err)
        })
    },
    deleteItem (item, index) {
      const loader = this.$loading.show()
      this.axios.delete(`https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/ec/shopping/${item.product.id}`)
        .then(res => {
          this.shoppingList.splice(index, 1)
          console.log(res)
          loader.hide()
        })
        .catch(err => {
          console.error(err)
        })
    },
    addItemQuantity (item, quantity) {
      const loader = this.$loading.show()
      this.axios.patch(`https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/ec/shopping`, {
        product: item.product.id,
        quantity: item.quantity + quantity
      })
        .then(res => {
          item.quantity = res.data.data.quantity
          loader.hide()
        })
        .catch(err => {
          console.error(err)
          loader.hide()
        })
    },
    sendOrder () {
      const loader = this.$loading.show()
      this.axios.post(`https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/ec/orders`, {
        name: this.username,
        email: this.email,
        tel: this.tel,
        address: this.address,
        payment: this.payMethod,
        coupon: this.coupon,
        message: this.message
      })
        .then(res => {
          console.log(res)
          loader.hide()
        })
        .catch(err => {
          console.error(err)
          loader.hide()
        })
    }
  }
}
</script>

<style scoped>

</style>
