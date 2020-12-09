let fruits = [
    { id: 1, title: 'Яблоки', price: 20, img: 'https://cdn.pixabay.com/photo/2014/10/15/22/06/apples-490474_960_720.jpg' },
    { id: 2, title: 'Апельсины', price: 30, img: 'https://cdn.pixabay.com/photo/2017/02/26/12/27/oranges-2100108_960_720.jpg' },
    { id: 3, title: 'Манго', price: 40, img: 'https://cdn.pixabay.com/photo/2016/03/05/22/41/mango-1239347_960_720.jpg' }
]

const toHTML = fruit => `
<div class="col">
<div class="card">
    <img src="${fruit.img}" class="card-img-top" style="height: 300px alt="${fruit.title}";">
    <div class="card-body">
    <h5 class="card-title">${fruit.title}</h5>
    <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
    <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
    </div>
    </div>
</div>
`

function render() {
    const html = fruits.map(toHTML).join('')
    document.getElementById('fruits').innerHTML = html
}
render()

const priceModal = $.modal({
    title: 'Цена',
    closable: true,
    width: '400px',
    footerButtons: [
        {
            text: 'Закрыть', type: 'primary', handler() {
                priceModal.close()
            }
        }
    ]
})



document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)

    if (btnType === 'price') {
        priceModal.setContent(`
        <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open()
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы Уверены?',
            content: `<p>Вы удаляете: <strong>${fruit.title}</strong></p>`
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch(() => {

        })
    }
})