function select(selector, filterTrue) {
   const dropDown = document.querySelector(selector)
   let filterItems = 0
   //filter init
   if (filterTrue) {
      const filterList = dropDown.querySelector('.dropdown__filter')
      if (filterList !== 0) {
         filterItems = filterList.querySelectorAll('[filter]')
      }

   }
   if (dropDown !== null) {
      const dropDownButton = dropDown.querySelector('.dropdown__button')
      const dropDownList = dropDown.querySelector('.dropdown__list')
      const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item')
      const dropDownInput = dropDown.querySelector('.dropdown__input--hidden')



      //open select list
      dropDownButton.addEventListener('click', function () {
         dropDownList.classList.toggle('dropdown__list--visible')
         this.classList.add('dropdown__button--active') //add active shadow
      })
      //open list and select value
      dropDownListItems.forEach(function (listItem) {
         listItem.addEventListener('click', function (e) {
            e.stopPropagation
            dropDownButton.innerText = this.innerText
            dropDownButton.focus()
            dropDownInput.value = this.dataset.value
            dropDownList.classList.remove('dropdown__list--visible')
            selectFilterValue(listItem.getAttribute('data-value'))
         })
      })
      //close select when click out
      document.addEventListener('click', function (e) {
         if (e.target !== dropDownButton) {
            dropDownList.classList.remove('dropdown__list--visible')
            dropDownButton.classList.remove('dropdown__button--active')
         }
      })
      //close select by press key esc or tab
      document.addEventListener('keydown', function (e) {
         if (e.key === 'Tab' || e.key === 'Escape') {
            dropDownList.classList.remove('dropdown__list--visible')
            dropDownButton.classList.remove('dropdown__button--active')
         }
      })

   }
   function selectFilterValue(filterValue) {
      filterItems.forEach(function (element) {
         let value = element.getAttribute('filter')
         element.style.display = ''
         if (value !== filterValue) {
            element.style.display = 'none'
         }
         if (filterValue === 'all') {
            element.style.display = ''
         }

      })
   }
}