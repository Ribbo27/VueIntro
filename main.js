Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `<div class="product">

                    <div class="prod-img">
                        <img :src="image"/>
                    </div>

                    <div class="prod-info">
                        <h1>{{ title }}</h1>
                        <a :href="link" target="_blank">More products</a>
                        <p v-if="inStock">In Stock!</p>
                        <p v-else
                        :class="{ outOfStock : !inStock  }"
                        >{Out of Stock}</p>
                        <p>Shipping: {{ shipping }}</p>
                        <p>{{ sale }}</p>  
                        
                        <prodDetails :details="details"></prodDetails>

                        <div class="color-box"
                            v-for="(variant, index) in variants" 
                            :key="variant.id"
                            :style="{ backgroundColor: variant.color}"
                            @mouseover="updateImgProd( index )"
                            >
                        </div>

                        <button v-on:click="addToCart"
                                :disabled="!inStock"
                                :class="{ disabledButton : !inStock }"
                                >Add to cart
                        </button>
                        <button @click="removeFromCart">Remove from cart</button>

                    </div>

                </div>`,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            selectedVariant: 0,
            link: 'https://www.amazon.it/Easton-Marlowe-PAIA-Calze-Fantasia/dp/B01N5961YY/ref=sr_1_1_sspa?__mk_it_IT=%C3%85M%C3%85%C5%BD%C3%95%C3%91&keywords=calze&qid=1562184872&s=gateway&sr=8-1-spons&psc=1', 
            variants: [
                {
                    id: 2701,
                    color: 'green',
                    img: './asset/imgs/greenSocks.png',
                    quantity: 10
                },{
                    id: 2702,
                    color: 'blue',
                    img: './asset/imgs/blueSocks.png',
                    quantity: 10
                }
            ],
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            onSale: false
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
        },
        removeFromCart() {
            this.$emit('del-from-cart', this.variants[this.selectedVariant].id);
        }, 
        updateImgProd( index ) {
            this.selectedVariant = index
            console.log( index )
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].img;
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity;
        },
        sale() {
            if(this.onSale) {
                return this.brand + ' ' + this.product + ' on Sales!';
            }
            return this.brand + ' ' + this.product;
        },
        shipping() {
            if(this.premium) {
                return 'free'
            }
            return '5,99$'
        }
    },
})

Vue.component('prodDetails', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
    <ul>
        <li v-for="detail in details">{{ detail }}</li>
    </ul>`,
})

var app = new Vue({
    el: '#app',  
    data: {
        premium: false,
        cart: []
    },
    methods : {
        addItem(id) {
            this.cart.push(id)
        },
        removeItem(id) {
            for( var i = this.cart.length - 1; i >= 0; i-- ) {
                if( this.cart[i] === id ){
                    this.cart.splice(i, 1);
                    break;
                }
            }
        }
    }
})