let addToCartButtons = document.getElementsByClassName('btn-primary')
let cartContainer = document.getElementsByTagName('tbody')[0]
let quantityFields = document.getElementsByClassName('num')
let delete_buttons = document.getElementsByClassName('uk-button-danger')

// 🍀js06. picking up all the Add-To-Cart buttons
for(let i = 0; i < addToCartButtons.length; i++){
    addToCartButtons[i].addEventListener('click', addToCart)
    
}
// 🍀js07. This function helps to add items to our cart
/* 
🦄 event_bubbling활용-클릭한 elem의 parent에 이벤트 걸기

*/
function addToCart(event){

    /*js07. btn, parentElement */
    let btn = event.target
    let btnGrandParent = btn.parentElement.parentElement
    let btnParent = btn.parentElement

    let itemImage = btnGrandParent.children[0].src
    let itemName = btnParent.children[0].innerText
    let itemPrice = btnParent.children[1].innerText

    // 🍀js18    
    let itemContainer = document.createElement('tr')    
    
    itemContainer.innerHTML = `
    <td><input class="uk-checkbox" type="checkbox"></td>
    <td><img class="uk-preserve-width uk-border-circle" src=${itemImage} width="40" alt=""></td>
    <td class="uk-table-link">
        <h3 class = "item-name">${itemName}</h3>
    </td>
    <td class="uk-text-truncate item-price"><h3>${itemPrice}</h3></td>
    <td><input type = 'number' class = 'num' value = '1'></td>
    <td class="uk-text-truncate total-price"><h3>${itemPrice}</h3></td>
    <td><button class="uk-button uk-button-danger" type="button">Remove</button></td>
    `

    cartContainer.append(itemContainer)

    // Accessing individual quantity fields
    for(let i = 0; i < quantityFields.length; i++){
        quantityFields[i].value = 1
        quantityFields[i].addEventListener('change', totalCost)
                
    }

    // Accessing individual quantity fields
    for(let i = 0; i < delete_buttons.length; i++){
        delete_buttons[i].addEventListener('click', removeItem)
    }

    grandTotal()

   
}



// This function helps to multiply the quantity and the price
function totalCost(event){
    let quantity = event.target
    quantity_parent = quantity.parentElement.parentElement
    price_field = quantity_parent.getElementsByClassName('item-price')[0]
    total_field = quantity_parent.getElementsByClassName('total-price')[0]

    /* replace(a,b) : a -> b 단어를 바꿔줌  */
    price_field_content = price_field.innerText.replace('$', '')

    /* item price * 갯수 */
    total_field.children[0].innerText = '$' +  quantity.value * price_field_content
    grandTotal()

    /*🍀js38 isNaN(value) – 인수를 숫자로 변환한 다음 NaN인지 테스트함 
    item.value가 0보다 작을때 (item생성),  quantity.value = 1로 설정
   
    🍉isNaN(~):
    ()안의 value가 number인지 아닌지 확인해줌.
    number인때  true   
    */
    if(isNaN(quantity.value)|| quantity.value <= 0){
        quantity.value = 1
    }

    
    
}

// 🍀js39. sum up of items price, (This function helps to add up the total of the items)
function grandTotal(){
    let total = 0
    let grand_total = document.getElementsByClassName('grand-total')[0]

    /* 🍄 price add, remove 방법: 
    그냥 테이블에 남아있는 아이템의 가격을 합치는 방식이면 됨
    
    */
    all_total_fields = document.getElementsByClassName('total-price')
    for(let i = 0; i < all_total_fields.length; i++){

        /* 🍄
            10 $ 표시 지움 : replace(a,b) : a -> b 단어를 바꿔줌 
            20 남은 글자를 number로 바꿈        
        */
        all_prices = Number(all_total_fields[i].innerText.replace('$', ''))
        total+=all_prices
    }
    grand_total.children[0].innerText = "$"+total
    grand_total.children[0].style.fontWeight = 'bold'
    console.log(total)
}


// 🍀js52. remove item on table
function removeItem(event){
    del_btn = event.target
    del_btn_parent = del_btn.parentElement.parentElement
    del_btn_parent.remove()
    console.log(del_btn)
    grandTotal()
    
}