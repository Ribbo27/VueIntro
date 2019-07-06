var eventBus = new Vue()

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">

        <div class="prod-img">
            <img :src="image"/>
        </div>

        <div class="prod-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock">In Stock!</p>
            <p v-else :class="{ outOfStock : !inStock  }">{Out of Stock}</p>
            <p>Shipping: {{ shipping }}</p>
            
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>

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

        <product-tabs :reviews="reviews"></product-tabs>

    </div>`,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            reviews: [],
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
            ]
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
        shipping() {
            if(this.premium) {
                return 'free'
            }
            return '5,99$'
        }
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }
})

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
        
        <p v-if="errors.length">
            <b>Please correct ther following error(s):</b>
            <ul>
                <li v-for="error in errors">{{ error }}  </li>
            </ul>
        </p>
        
        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name">
        </p>
        
        <p>
            <label for="review">Review:</label>
            <input id="review" v-model="review">
        </p>

        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
        </p>

        <p>Would you recommend this product?</p>
        <label>
            Yes
            <input type="radio" value="Yes" v-model="recommend"/>
        </label>
        <label>
            No
            <input type="radio" value="No" v-model="recommend"/>
        </label>

        <p>
            <input type="submit" value="Submit">
        </p>

    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            this.errors = []
            if(this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            } else {
                if(!this.name) this.errors.push("Name required.")                                        
                if(!this.review) this.errors.push("Review required.")                                    
                if(!this.rating) this.errors.push("Rating required.")                                        
                if(!this.recommend) this.errors.push("Recommend required.")                                        
            }
        }
    }
})

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template:`
        <div>
            <ul>
                <span class="tab"
                    :class="{ activeTab: selectedTab === tab}"
                    v-for="(tab, index) in tabs" 
                    @click="selectedTab = tab"
                    :key="tab">
                    {{ tab }}</span>
            </ul>

            <div v-show="selectedTab === 'Reviews'">
                <p v-if="!reviews.length">There are not reviews yet.</p>
                <ul v-else>
                    <li v-for="(review, index) in reviews" :key="index">
                        <p>{{ review.name }}</p>
                        <p>Rating: {{ review.rating }}</p>
                        <p>{{ review.review }}</p>
                    </li>
                </ul>
            </div>
            
            <div v-show="selectedTab === 'Make a review'">
                <product-review></product-review>
            </div>

        </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a review'],
            selectedTab: 'Reviews'
        }
    }
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