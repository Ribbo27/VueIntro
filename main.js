var app = new Vue({
    el: '#app',
    data: {
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
                quantity: 0
            }
        ],
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        cart: 0,
        onSale: true
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        removeFromCart() {
            this.cart -= 1
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
            } else {
                return this.brand + ' ' + this.product;
            }
        }
    },
})