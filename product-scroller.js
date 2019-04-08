/*

featured-scroller.js

An editable scroller displaying items

(C) 2018 Spoton.net Limited
Created by Liam Langstaff

*/

if (!W.EDIT_MODE){

  runOnLoad(function(){

    //define the total width and guttering the product will be
    const WIDTH = 220;
    const GUTTER = 40;

    //define variables
    let controls      = document.querySelector('.scroller-controls');
    let controlLeft   = document.querySelector('.control-left')
    let controlRight  = document.querySelector('.control-right')
    let scroller      = document.querySelector('.s-products-grid');
    let scrollerItems = document.querySelectorAll('.s-products-grid > li');
    let container     = document.querySelector('.featured-scroller');
    let translate     = 0;
    let scrollerWidth = (WIDTH + GUTTER) * scrollerItems.length;


    let hovered = false;

    //function for scrolling right
    function scrollRight(){
    
        //is it scrolling?
        scrolling = true;

        //then set the total translation value to the width and gutter value
        translate += WIDTH + GUTTER;

        //then actually transform the scroller to scroll right
        scroller.style.transform = "translateX("+(-translate)+"px)";

        
        window.setTimeout(function(){
            scrolling = false;
            if(translate >= scrollerWidth){

            scroller.style.transition = 'none';
            translate = translate - scrollerWidth;
            scroller.style.transform = "translateX("+(-translate)+"px)";
            scroller.offsetWidth;
            scroller.style.transition = 'transform .5s';
            }
        },500)
        }

    function scrollLeft(){
      scrolling = true;

      if(translate < WIDTH + GUTTER){

        scroller.style.transition = 'none';
        translate = translate + scrollerWidth;
        scroller.style.transform = "translateX("+(-translate)+"px)";

        scroller.offsetWidth;
        scroller.style.transition = 'transform .5s';
      }

      translate -= WIDTH + GUTTER;
      scroller.style.transform = "translateX("+(-translate)+"px)";

      window.setTimeout(function(){
        scrolling = false;
      },500)
    }

    let scrolling = false;

    window.setInterval(function(){
      if(!hovered){
        scrollRight();
      }

    },2000)


    controls.addEventListener('click', handleClick)

    function handleClick(e){

      if(scrolling){
        return;
      }

      if(e.target == controlLeft){

        scrollLeft();

      } else if(e.target == controlRight) {

       scrollRight();

      }
    }

    container.addEventListener('mouseenter', function(){
      hovered = true;
    })

    container.addEventListener('mouseleave', function(){
      hovered = false;
    })



    function handleHover(){
      scroller.style.transform = "translateX("+(-translate)+"px)";
    }



    let targetWidth = container.offsetWidth + scroller.offsetWidth;
    let node = scroller.children[0];

    while(scroller.offsetWidth < targetWidth){
      scroller.appendChild(node.cloneNode(true))
      node = node.nextElementSibling;
    }

  })
}
