
      var ctx = document.getElementById("myChart");

        //font size for tooltip

        if (window.innerWidth > 650) {
          var toolTipSize = 18;
          var toolTipPadding = 10;
        } else {
          var toolTipSize = 14;
          var toolTipPadding = 5;
        }

        var tooltipEnabled = true;

        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
               labels: [
                  ["$27,449,233", "42%"],
                  ["$17,489,545", "26%"],
                  ["$2,924,817", "4%"],
                  ["$7,619,631", "12%"],
                  ["$10,464,238", "16%"]
              ],
              datasets: [{
                  data: [27449233, 17489545, 2924817, 7619631, 10464238],
                  backgroundColor: [
                      '#cecece',
                      '#333',
                      '#555',
                      '#777',
                      '#999'
                  ],
                  hoverBackgroundColor: [ 'rgb(0,99,199)', 'rgb(0,99,199)', 'rgb(0,99,199)', 'rgb(0,99,199)', 'rgb(0,99,199)' ]
              }]
            },
            options: {
                //showAllTooltips: false,
                animation: {
                  duration:1000
                },
                legend: {
                  display: false
                },
                tooltips: {
                    enabled: tooltipEnabled,
                    mode: 'single',
                    bodyFontSize: toolTipSize,
                    bodyFontColor: '#000000',
                    backgroundColor: 'rgba(255,255,255,.8)',
                    bodyFontFamily: 'montserratregular',
                    yPadding: toolTipPadding,
                    xPadding: toolTipPadding,
                    TooltipCaretSize: 0,
                    displayColors: false,
                    callbacks: {
                      label: function(tooltipItem, data) {
                        var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
                        var label = data.labels[tooltipItem.index];

                        //return datasetLabel + label + tooltipItem.index;
                        // By returning label as an array, we get multiline tooltipItem
                        return label;
                        }
                    }
                }
        }


      });


      //Open Tooltip on pie

      function openTip(myChart,datasetIndex,pointIndex){
         if(window.myChart.tooltip._active == undefined)
            window.myChart.tooltip._active = []
         var activeElements = window.myChart.tooltip._active;
         var requestedElem = window.myChart.getDatasetMeta(datasetIndex).data[pointIndex];
         for(var i = 0; i < activeElements.length; i++) {
             if(requestedElem._index == activeElements[i]._index)  
                return;
         }
         activeElements.push(requestedElem);
         //window.myChart.tooltip._view.body = window.myChart.getDatasetMeta(datasetIndex).data;
         window.myChart.tooltip._active = activeElements;
         window.myChart.tooltip.update(true);
         window.myChart.draw();
      }


      //Close Tooltip on pie
      
      function closeTip(myChart,datasetIndex,pointIndex){
         var activeElements = window.myChart.tooltip._active;
         if(activeElements == undefined || activeElements.length == 0)
           return;
         var requestedElem = window.myChart.getDatasetMeta(datasetIndex).data[pointIndex];
         for(var i = 0; i < activeElements.length; i++) {
             if(requestedElem._index == activeElements[i]._index)  {
                activeElements.splice(i, 1);
                break;
             }
         }
         window.myChart.tooltip._active = activeElements;
         window.myChart.tooltip.update(true);
         window.myChart.draw();
      }

      $( document ).ready(function() {

        //Show first slice of pie on load
        $( window ).on('load', function() {
            setTimeout(function () {
            //console.log('loaded');
              myChart.data.datasets[0].backgroundColor[0] = 'rgb(0,99,199)';
              myChart.data.datasets[0].backgroundColor[1] = '#333';
              myChart.data.datasets[0].backgroundColor[2] = '#555';
              myChart.data.datasets[0].backgroundColor[3] = '#777';
              myChart.data.datasets[0].backgroundColor[4] = '#999';              

              var $car = $('#chart-card').flickity();
              var flkty = $car.data('flickity');

              openTip(myChart,0,0);

              myChart.update();

            }, 600);
        });


        var cardIndexZero = $('.card-index-zero');
        var cardIndexOne = $('.card-index-one');
        var cardIndexTwo = $('.card-index-two');
        var cardIndexThree = $('.card-index-three');
        var cardIndexFour = $('.card-index-four');

        var flcktyDotOne = $('.flickity-page-dots li:nth-child(1)');
        var flcktyDotTwo = $('.flickity-page-dots li:nth-child(2)');
        var flcktyDotThree = $('.flickity-page-dots li:nth-child(3)');
        var flcktyDotFour = $('.flickity-page-dots li:nth-child(4)');
        var flcktyDotFive = $('.flickity-page-dots li:nth-child(5)');


        // Hover states for pie
        
        $('#myChart').on('mousemove click', function(evt) {

            var $car = $('#chart-card').flickity();
            var flkty = $car.data('flickity');


            function updateStatus(numb) {
              $('#chart-card').data('flickity').selectedIndex = numb;
              // console.log($('#chart-card').data('flickity').selectedIndex);
            }


            var el = window.myChart.getElementsAtEvent(evt);

            // Check if onmouseover area is within the pie chart, if so, grab the index of the slice
            
            if(el[0]) { 

              var i = el[0]._index;

              if (i === 0) {

                if (!$('.card-index-one').hasClass('is-selected')) {  
                  cardIndexZero.addClass('is-selected');
                  //remove is selected from all other;
                  cardIndexOne.removeClass('is-selected');
                  cardIndexTwo.removeClass('is-selected');
                  cardIndexThree.removeClass('is-selected');
                  cardIndexFour.removeClass('is-selected');
                }    

                //Update the slider navigation
                flcktyDotOne.addClass('is-selected');
                flcktyDotTwo.removeClass('is-selected');
                flcktyDotThree.removeClass('is-selected');
                flcktyDotFour.removeClass('is-selected');
                flcktyDotFive.removeClass('is-selected');

                //all other background colors back to normal except the one mouse is over.
                myChart.data.datasets[0].backgroundColor[0] = 'rgb(0,99,199)';
                myChart.data.datasets[0].backgroundColor[1] = '#333';
                myChart.data.datasets[0].backgroundColor[2] = '#555';
                myChart.data.datasets[0].backgroundColor[3] = '#777';
                myChart.data.datasets[0].backgroundColor[4] = '#999';

                myChart.update();     

                updateStatus(0);        

              }
              if (i === 1) {

                if (!$('.card-index-two').hasClass('is-selected')) {  
                  cardIndexOne.addClass('is-selected');
                  //remove is selected from all other;
                  cardIndexZero.removeClass('is-selected');
                  cardIndexTwo.removeClass('is-selected');
                  cardIndexThree.removeClass('is-selected');
                  cardIndexFour.removeClass('is-selected');
                }         

                //Update the slider navigation
                flcktyDotOne.removeClass('is-selected');
                flcktyDotTwo.addClass('is-selected');
                flcktyDotThree.removeClass('is-selected');
                flcktyDotFour.removeClass('is-selected');
                flcktyDotFive.removeClass('is-selected');                    

                //all other background colors back to normal except the one mouse is over.
                myChart.data.datasets[0].backgroundColor[0] = '#cecece';
                myChart.data.datasets[0].backgroundColor[1] = 'rgb(0,99,199)';
                myChart.data.datasets[0].backgroundColor[2] = '#555';
                myChart.data.datasets[0].backgroundColor[3] = '#777';
                myChart.data.datasets[0].backgroundColor[4] = '#999';

                myChart.update();

                updateStatus(1);
      
              }
              if (i === 2) {

                if (!$('.card-index-three').hasClass('is-selected')) {  
                  cardIndexTwo.addClass('is-selected');
                  //remove is selected from all other;
                  cardIndexZero.removeClass('is-selected');
                  cardIndexOne.removeClass('is-selected');
                  cardIndexThree.removeClass('is-selected');
                  cardIndexFour.removeClass('is-selected');
                }  

                //Update the slider navigation
                flcktyDotOne.removeClass('is-selected');
                flcktyDotTwo.removeClass('is-selected');
                flcktyDotThree.addClass('is-selected');
                flcktyDotFour.removeClass('is-selected');
                flcktyDotFive.removeClass('is-selected');                

                //all other background colors back to normal except the one mouse is over.
                myChart.data.datasets[0].backgroundColor[0] = '#cecece';
                myChart.data.datasets[0].backgroundColor[1] = '#333';
                myChart.data.datasets[0].backgroundColor[2] = 'rgb(0,99,199)';
                myChart.data.datasets[0].backgroundColor[3] = '#777';
                myChart.data.datasets[0].backgroundColor[4] = '#999';

                myChart.update();

                updateStatus(2);

              }
              if (i === 3) {

                if (!$('.card-index-four').hasClass('is-selected')) {  
                  cardIndexThree.addClass('is-selected');
                  //remove is selected from all other;
                  cardIndexZero.removeClass('is-selected');
                  cardIndexOne.removeClass('is-selected');
                  cardIndexTwo.removeClass('is-selected');
                  cardIndexFour.removeClass('is-selected');
                }               

                //Update the slider navigation
                flcktyDotOne.removeClass('is-selected');
                flcktyDotTwo.removeClass('is-selected');
                flcktyDotThree.removeClass('is-selected');
                flcktyDotFour.addClass('is-selected');
                flcktyDotFive.removeClass('is-selected');   

                //all other background colors back to normal except the one mouse is over.
                myChart.data.datasets[0].backgroundColor[0] = '#cecece';
                myChart.data.datasets[0].backgroundColor[1] = '#333';
                myChart.data.datasets[0].backgroundColor[2] = '#555';
                myChart.data.datasets[0].backgroundColor[3] = 'rgb(0,99,199)';
                myChart.data.datasets[0].backgroundColor[4] = '#999';

                myChart.update();   

                updateStatus(3);

              }
              if (i === 4) {

                if (!$('.card-index-five').hasClass('is-selected')) {  
                  cardIndexFour.addClass('is-selected');
                  //remove is selected from all other;
                  cardIndexZero.removeClass('is-selected');
                  cardIndexOne.removeClass('is-selected');
                  cardIndexTwo.removeClass('is-selected');
                  cardIndexThree.removeClass('is-selected');
                }  

                //Update the slider navigation
                flcktyDotOne.removeClass('is-selected');
                flcktyDotTwo.removeClass('is-selected');
                flcktyDotThree.removeClass('is-selected');
                flcktyDotFour.removeClass('is-selected');
                flcktyDotFive.addClass('is-selected');        

                //all other background colors back to normal except the one mouse is over.
                myChart.data.datasets[0].backgroundColor[0] = '#cecece';
                myChart.data.datasets[0].backgroundColor[1] = '#333333';
                myChart.data.datasets[0].backgroundColor[2] = '#555555';
                myChart.data.datasets[0].backgroundColor[3] = '#777777';
                myChart.data.datasets[0].backgroundColor[4] = 'rgb(0,99,199)';

                myChart.update();  

                updateStatus(4);

              }  

          } // end if statement to check if onmouseover is within pie chart    

       });
        

        // Check the current slide index, and adjust pie accordingly

        function checkFlickityIndex() {

          if ($('#chart-card').data('flickity').selectedIndex === 0) {  

            myChart.data.datasets[0].backgroundColor[0] = 'rgb(0,99,199)';

            myChart.data.datasets[0].backgroundColor[1] = '#333';
            myChart.data.datasets[0].backgroundColor[2] = '#555';
            myChart.data.datasets[0].backgroundColor[3] = '#777';
            myChart.data.datasets[0].backgroundColor[4] = '#999';

            myChart.update();

            //remove is selected from all other;
            cardIndexOne.removeClass('is-selected');
            cardIndexTwo.removeClass('is-selected');
            cardIndexThree.removeClass('is-selected');
            cardIndexFour.removeClass('is-selected');

            //Update the slider navigation
            flcktyDotTwo.removeClass('is-selected');
            flcktyDotThree.removeClass('is-selected');
            flcktyDotFour.removeClass('is-selected');
            flcktyDotFive.removeClass('is-selected');  

            //Show tooltip on the corisponding slice, close all other tooltips if any are open
            openTip(myChart,0,0);
            closeTip(myChart,0,1);
            closeTip(myChart,0,2);
            closeTip(myChart,0,3);
            closeTip(myChart,0,4);

          }

          if ($('#chart-card').data('flickity').selectedIndex === 1) {

            myChart.data.datasets[0].backgroundColor[1] = 'rgb(0,99,199)';

            myChart.data.datasets[0].backgroundColor[0] = '#cecece';
            myChart.data.datasets[0].backgroundColor[2] = '#555';
            myChart.data.datasets[0].backgroundColor[3] = '#777';
            myChart.data.datasets[0].backgroundColor[4] = '#999';

            myChart.update();

            //remove is selected from all other;
            cardIndexZero.removeClass('is-selected');
            cardIndexTwo.removeClass('is-selected');
            cardIndexThree.removeClass('is-selected');
            cardIndexFour.removeClass('is-selected');

            //Update the slider navigation
            flcktyDotOne.removeClass('is-selected');
            flcktyDotThree.removeClass('is-selected');
            flcktyDotFour.removeClass('is-selected');
            flcktyDotFive.removeClass('is-selected');  

            //Show tooltip on the corisponding slice, close all other tooltips if any are open
            openTip(myChart,0,1);
            closeTip(myChart,0,0);
            closeTip(myChart,0,2);
            closeTip(myChart,0,3);
            closeTip(myChart,0,4);

          }

          if ($('#chart-card').data('flickity').selectedIndex === 2) {
            myChart.data.datasets[0].backgroundColor[2] = 'rgb(0,99,199)';

            myChart.data.datasets[0].backgroundColor[0] = '#cecece';
            myChart.data.datasets[0].backgroundColor[1] = '#333';
            myChart.data.datasets[0].backgroundColor[3] = '#777';
            myChart.data.datasets[0].backgroundColor[4] = '#999';

            myChart.update();

            //remove is selected from all other;
            cardIndexZero.removeClass('is-selected');
            cardIndexOne.removeClass('is-selected');
            cardIndexThree.removeClass('is-selected');
            cardIndexFour.removeClass('is-selected');

            //Update the slider navigation
            flcktyDotOne.removeClass('is-selected');
            flcktyDotTwo.removeClass('is-selected');
            flcktyDotFour.removeClass('is-selected');
            flcktyDotFive.removeClass('is-selected');  

            //Show tooltip on the corisponding slice, close all other tooltips if any are open
            openTip(myChart,0,2);
            closeTip(myChart,0,0);
            closeTip(myChart,0,1);
            closeTip(myChart,0,3);
            closeTip(myChart,0,4);

          }

          if ($('#chart-card').data('flickity').selectedIndex === 3) {

            myChart.data.datasets[0].backgroundColor[3] = 'rgb(0,99,199)';

            myChart.data.datasets[0].backgroundColor[0] = '#cecece';
            myChart.data.datasets[0].backgroundColor[1] = '#333';
            myChart.data.datasets[0].backgroundColor[2] = '#555';
            myChart.data.datasets[0].backgroundColor[4] = '#999';

            myChart.update();

            //remove is selected from all other;
            cardIndexZero.removeClass('is-selected');
            cardIndexOne.removeClass('is-selected');
            cardIndexTwo.removeClass('is-selected');
            cardIndexFour.removeClass('is-selected');

            //Update the slider navigation
            flcktyDotOne.removeClass('is-selected');
            flcktyDotTwo.removeClass('is-selected');
            flcktyDotThree.removeClass('is-selected');
            flcktyDotFive.removeClass('is-selected');  

            //Show tooltip on the corisponding slice, close all other tooltips if any are open
            openTip(myChart,0,3);
            closeTip(myChart,0,0);
            closeTip(myChart,0,1);
            closeTip(myChart,0,2);
            closeTip(myChart,0,4);

          }

          if ($('#chart-card').data('flickity').selectedIndex === 4) {

            myChart.data.datasets[0].backgroundColor[4] = 'rgb(0,99,199)';

            myChart.data.datasets[0].backgroundColor[0] = '#cecece';
            myChart.data.datasets[0].backgroundColor[1] = '#333';
            myChart.data.datasets[0].backgroundColor[2] = '#555';
            myChart.data.datasets[0].backgroundColor[3] = '#777';

            myChart.update();

            //remove is selected from all other;
            cardIndexZero.removeClass('is-selected');
            cardIndexOne.removeClass('is-selected');
            cardIndexTwo.removeClass('is-selected');
            cardIndexThree.removeClass('is-selected');

            //Update the slider navigation
            flcktyDotOne.removeClass('is-selected');
            flcktyDotTwo.removeClass('is-selected');
            flcktyDotThree.removeClass('is-selected');
            flcktyDotFour.removeClass('is-selected');  

            //Show tooltip on the corisponding slice, close all other tooltips if any are open
            openTip(myChart,0,4);
            closeTip(myChart,0,0);
            closeTip(myChart,0,1);
            closeTip(myChart,0,2);
            closeTip(myChart,0,3);

          }  

        } //end checkFlickityIndex


        //Run checkFlickityIndex when flickity card settles.  Timeout to allow animation to run.
        setTimeout(function () {  
          $('#chart-card').flickity().on( 'settle.flickity', function() {
            checkFlickityIndex();
          });
        }, 600);  


        // Set first slice as default state when not hovering over pie.
        $('#myChart').on('mousemove', function(evt){  

          var el = window.myChart.getElementsAtEvent(evt);

          function setFirstSlice() {
              myChart.data.datasets[0].backgroundColor[0] = 'rgb(0,99,199)';
              myChart.data.datasets[0].backgroundColor[1] = '#333';
              myChart.data.datasets[0].backgroundColor[2] = '#555';
              myChart.data.datasets[0].backgroundColor[3] = '#777';
              myChart.data.datasets[0].backgroundColor[4] = '#999';              

              cardIndexZero.addClass('is-selected');            
              //remove is selected from all other;
              cardIndexOne.removeClass('is-selected');     
              cardIndexTwo.removeClass('is-selected');
              cardIndexThree.removeClass('is-selected');
              cardIndexFour.removeClass('is-selected');

              //Update the slider navigation
              flcktyDotOne.addClass('is-selected');
              flcktyDotTwo.removeClass('is-selected');
              flcktyDotThree.removeClass('is-selected');
              flcktyDotFour.removeClass('is-selected');  
              flcktyDotFive.removeClass('is-selected');  

              var $car = $('#chart-card').flickity();
              var flkty = $car.data('flickity');

              openTip(myChart,0,0);

              myChart.update();

              $('#chart-card').data('flickity').selectedIndex = 0;
          }

          // If mouse hovers over pie then leaves pie, activate the first slice.            
          if(el[0]) { 

            var i = el[0]._index;

              $('#myChart').on('mouseout', function() {
                setFirstSlice();
              });

          } // end if el[0]

          // Area within pie container, but not within actual pie.  If mouseover this after mouse leaves pie, also activate first slice.
          if(el[0] === undefined) {
            if ($('#chart-card').data('flickity').selectedIndex === 1 ||
                $('#chart-card').data('flickity').selectedIndex === 2 ||
                $('#chart-card').data('flickity').selectedIndex === 3 ||
                $('#chart-card').data('flickity').selectedIndex === 4 ||
                $('#chart-card').data('flickity').selectedIndex === 0) {
                  //console.log('you left pie');
                  setFirstSlice();
            }
          }

        });


      }); //end document.ready

