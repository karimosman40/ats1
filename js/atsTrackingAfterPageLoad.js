$(function(){
	
	var userId = getCookie('55ID'),
	login = $('#login55'),
	mdp = $('#password55'),
	cnx = $('#cnx55'),
	msg = $('#msg'),
	form=$('#signInForm'),
	deconnexion = $('#decnx55');
	nav = $('#cnxDcnx');
	
	// If the 55Id cookie returns a value, we change the text of the link in the nav
	if(!!userId && userId.length > 0){
		nav.text('Sign-out');
	}
	// DISCONNECT (we delete the cookie containing the ID. The link clicked to for text "sign-out")
	nav.click(function(e){
		if(this.text == 'Sign-out'){
			e.preventDefault();
			document.cookie = '55ID=;path=/';
			document.location.href="login.html";
			/* tracking of sign out begin
			*/

			// tracking of sign out end
		}
	});

	if(/login\.html/.test(window.location.pathname)){
		
		// Connection
		cnx.click(function(e){
			
			e.preventDefault();
			
			// We check that the login entered is in the list of users
			for(var i = 0; i<usersList.length; i++){
				if(usersList[i]['login'] == login.val()){
					var connected_user_id = usersList[i];
				}
			}
			
			// If this is the case, we compare the entered password with the saved one.
			if(!!connected_user_id){
				// If it matches we connect the user (creation of a cookie containing the ID)
				if(mdp.val()==connected_user_id.password){
					document.cookie = '55ID=' + connected_user_id.id+ ';path=/';
					document.location.href="index.html";
					/* tracking of login begin
					*/

					// tracking of login end
				} else { // If the password does not match
					msg.html('<p style="color:red;font-weight:bold;">Authentication failed : check your username and password and try again</p>');
				}
				
			} else { // If the user is not found in the list
				msg.html('<p style="color:red;font-weight:bold;">Authentication failed : check your username and password and try again</p>');
			}

		});
	}

	if(/index\.html/.test(window.location.pathname)){
		var promotions = [],
			index =0;
		document.querySelectorAll("#myCarousel div.carousel-inner div.item a").forEach(
			function(element){
				for(var v=0;v<travelDestinations.length;v++)
				{
					if(element.getAttribute("href").match(travelDestinations[v].hashName)!==null)
					{
						promotions.push(
							{
								'item_name': travelDestinations[v].name, // Name or ID is required.
								'item_id': travelDestinations[v].id,
								'price': '33.75',
								'item_category': travelDestinations[v].category,
								"item_variant": "6 nights",
								'promotion_id': travelDestinations[v].id,
								'promotion_name': 'carousel',
								'creative_name': travelDestinations[v].hashName,
								'creative_slot': index,
								'location_id': index,
								'index': index,
								'quantity': '1'
							}
						);
						index++;
						break;
					}
				}
			}
		);
		/* tracking of Ecommerce promotion views action begin
		* use promotions JS variable to get promotions details
		*/

		// tracking of Ecommerce promotion views action end

		$(".carousel-inner a").on('click',function(e){
			var destination = $(this).attr('href').split('#');
			for(var v=0; v<promotions.length;v++){
				if(promotions[v].creative_name.match(destination[1])!== null)
				{
					/* tracking of Ecommerce promotion click action begin
                    * use promotions[v] JS variable to get promotions details
                    */

					// tracking of Ecommerce promotion click action end
					break;
				}
			}
		});

		$("#viewDestination a").on('click',function(e){
			/* tracking of View Destinations button click begin
			*/

			// tracking of View Destinations button click end
		});
		
	}

	if(/destinations\.html/.test(window.location.pathname)){
		
		$('.videos').on('click',function(e){
			
			e.preventDefault();
			
			for(var j=0; j<travelDestinations.length;j++){
				
				if(travelDestinations[j].name.toLowerCase() === $(this).data("name")){
						var videoLink = travelDestinations[j].video;
				}
			}

			$('#destinationsVideos').css('top', $(window).scrollTop());
			
			$('#destinationsVideos').html('<iframe id="player" type="text/html" width="960" height="540" src="'+videoLink+'?enablejsapi=1&rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>"');
			
			$('#destinationsVideos').fadeIn(500);
				
		});
		
		$('#destinationsVideos').on('click', function(){
			$(this).html('');
			$(this).fadeOut(500);
		});
			
		var location = window.location.search.replace('?search=',''), list="all", cat;
		
		// Addition of the parameter in the url during a search
		 $('#search_destination').on('submit', function(e){
			 e.preventDefault();
			 var kw = $(this).find('input[type="search"]').val();
			 window.location.href = "destinations.html?search="+kw;
			 /* tracking of search begin
			 * use kw JS variable to get the search keyword
			 */

			 // tracking of search end
		});
		
		var regex = new RegExp(location, 'gi');
		// Sort by destination category
		if(/cat=button/.test(location)){
			
			var matches = [];
			
			if(/islands/.test(location)){
				list = 'islands';
				cat = 'island';
			} else if(/cities/.test(location)){
				list = 'cities';
				cat = 'city';
			}	
			
			for(var j=0; j<travelDestinations.length;j++){
				
				if(travelDestinations[j].category === cat){
						matches.push(travelDestinations[j].name);
				}
			}
			var regex = new RegExp(matches.join('|'), 'gi');
		} 
		else if (/search=.*/.test(window.location.search)){
			list = "search";
		}
		

		var index = 0,products = [];
			 
		 $('h2').each(function(data) {
			 
			 var element = $( this ),
			 parent = element.parent(),
			 name = element.html().split('<small>');
			 name = name[0].replace(/^\s+|\s+$/gm,'');
			
			if(!element.text().match(regex)){
				parent.hide();
				parent.next().hide();
			}
			
			if(parent.css('display') === "block"){
				for(var v=0; v<travelDestinations.length;v++){
					if(name === travelDestinations[v].name){
						products.push({
							"item_list_name":list,
							"index": index,
							"item_id": travelDestinations[v].id,
							"item_category": travelDestinations[v].category,
							"price": travelDestinations[v].price.toString(),
							"item_name": travelDestinations[v].name,
							"item_variant": "6 nights"
						});
					}
				}
				index++;
			 }
		});
		/* tracking of Ecommerce product views in list action begin
		* use products JS variable to get products details
		* use list JS variable to set list value in products.
		*/

		// tracking of Ecommerce product views in list end

		// Add a listener on each button details to send an event dL select_item on the click
		document.querySelectorAll('a[href*="details.html"]').forEach(
			function(element){
				element.addEventListener('click', function(event){
					for(var v=0; v<products.length;v++){
						if( event.target.getAttribute("href").match( products[v].item_name.toLocaleLowerCase() )!==null )
						{
							/* tracking of Ecommerce product click in list action begin
							* use products[v] JS variable to get products details
							* use list JS variable to set list value in actionField.
							*/

							// tracking of Ecommerce product click in list end
							break;
						}
					}
				});
			});
	}

	if(/details\.html/.test(window.location.pathname)){
				
		$('#destinations > *').hide();

		var hash = window.location.hash.substr(1);
		
		if(!!hash){
			$('#content-' + hash).fadeIn();
		} else {
			document.location.href="destinations.html"; 
		}
	
		// If the basket is not defined, we create it
		var cart55 = getCookie('55Basket') ? JSON.parse(getCookie('55Basket')) : [];

		$('a.btn-primary').on('click', function(e){
			
			e.preventDefault();

			// We retrieve the name of the opinion clicked in the data-name attribute and the quantity chosen
			var name = document.location.hash.substr(1),
			quantity = parseInt($(this).parent().find('select').val());
			
			// We browse the table of destinations to retrieve the information of the destination
			for(var i = 0; i<travelDestinations.length; i++){
				
				var destinationDetails = travelDestinations[i]['name'];
				
				if(destinationDetails.replace(' ','').toLowerCase() == name){
					var travelD = travelDestinations[i];
				}
			}
			
			name = travelD.name;
			id= travelD.id;
			price = travelD.price;
			category = travelD.category;
			img = travelD.img;
			
			// Control variable to determine whether to add to the basket or increase the quantity
			var newItem = true;
			
			// If the item already exists in the cart, the quantity is increased and the indicator is set to false
			cart55.forEach(function(travel){
				if(travel.name===name){
						travel.quantity = quantity;
						newItem = false;
				}
			});
			
			// If the control variable is still true, it means that it is a new article to add
			if(newItem === true){
				cart55.push({id:id,category:category,name:name,price:price,quantity:quantity,img:img});
			}
			
			if(cart55.length > 0){
				$('#navBasketItems span').text(' ('+cart55.length+')');
			} else {
				$('#navBasketItems span').text('');
			}
			
			document.cookie = '55Basket=' + JSON.stringify(cart55)+ ';path=/';
			
			 $('#continueShoppingOverlay').fadeIn().delay(5000).fadeOut();
			/* tracking of Ecommerce product add to cart action begin
            * use id JS variable to get product id
            * use category JS variable to get product category
            * use name JS variable to get product name
            * use price JS variable to get product price
            * use quantity JS variable to get product quantity
            */

			// tracking of Ecommerce product add to cart action end
		});
			
	}
	
	if(/basket\.html/.test(window.location.pathname)){
		
		var page =$('#basket_content'),
		panier = $('#basket_content table');
		
		page.css('display','block');

		var cart55 = getCookie('55Basket') ? JSON.parse(getCookie('55Basket')) : [];

		if(!JSON.parse(getCookie('55Basket')) || cart55.length <1){
			page.html('<p id="emptyCart">No items in your cart : <a href="destinations.html">Select your destination</a></p>');
		}
		
		cart55.forEach(function(travel){
				
			$('#basket_content table').append('<tr>\
					<td><img width="100px" src="img/'+travel.img+'_1.jpg"></td>\
					<td>'+capitalizeFirstLetter(travel.name)+'</td>\
					<td>'+travel.quantity+'</td>\
					<td class="totalPrice">$'+travel.price * travel.quantity+'</td>\
					<td class="action"><a href="details.html#'+travel.name.toLowerCase()+' "><i class="icon-pencil"></i></a> - \
					<i  data-name="'+travel.name+'" class="icon-trash remove"></i></td>\
				</tr>');
				
		});
		var totalPrice = calculate($('.totalPrice')) ;

		panier.append(
			'<tr>\
				<td id="basketPrice" colspan=3>Total : $'+totalPrice+'</td>\
				<td id="basketCheckout" colspan=2><a href="checkout.html">Checkout</a></td>\
			</tr>'
		);
		var cart55 = getCookie('55Basket') ? JSON.parse(getCookie('55Basket')) : [];
		var products=[];
		if(JSON.parse(getCookie('55Basket')) || cart55.length <1) {

			cart55.forEach(function (travel) {
				products.push({
					"item_id": travel.id,
					"item_category": travel.category,
					"price": travel.price,
					"item_name": travel.name,
					"quantity": travel.quantity,
					"item_variant": "6 nights"
				});
			});
			/* tracking of Ecommerce product view cart action begin
			* use totalPrice JS variable to get the total basket price
			* use products JS variable to get products details
			*/

			// tracking of Ecommerce product view cart action end
			$('.remove').on('click', function(e){
				e.preventDefault();

				var cart55 = JSON.parse(getCookie('55Basket'));

				// Name of the destination you want to delete
				var name = $(this).data().name;

				// We loop in the way to find the index of the object to which the name belongs in the array
				var productRemoved = {};
				for(var i = 0; i < cart55.length; i++) {
					if(cart55[i].name==name){
						// We remove the found object from the array
						productRemoved= cart55.splice(i, 1)[0];
					}
				}
				// If more than one article we delete the line, if it is the only article we delete the table containing the basket
				if(JSON.parse(getCookie('55Basket')).length === 1){
					$(this).parent().parent().parent().remove();
				} else {
					$(this).parent().parent().remove();
				}

				// We recalculate the amount of the basket
				panier = $('#basket_content table #basketPrice').html('$'+calculate($('.totalPrice')));

				// We store the new array in the cookie
				document.cookie = '55Basket=' + JSON.stringify(cart55)+ ';path=/';

				// Modification of the number of items in the nav menu
				if(cart55.length > 0){
					$('#navBasketItems span').text(' ('+cart55.length+')');
				} else {
					$('#basket_content').html('<p id="emptyCart">No items in your cart : <a href="destinations.html">Select your dream destinations</a></p>');
					$('#navBasketItems span').text('');
				}
				/* tracking of Ecommerce product remove from cart action begin
                * use productRemoved JS variable to get removed product detail
                */

				// tracking of Ecommerce product remove from cart action end
			});
		}

	} // End of basket secton script
	
	// Checkout (payment and shipping option)
	if(/checkout\.html/.test(window.location.pathname)){
		
		// Retrieving basket information from the 55Basket cookie
		var cart55 = JSON.parse(getCookie('55Basket'));
		
		// If cart55 return null, the cart is empty, we return to destinations
		if(cart55 ==null){
			window.location.href="destinations.html";
		} 
		
		// If an address has already been entered, we retrieve it to display it in the form otherwise empty object
		var userInformations  = getCookie('55UserInformations') ? JSON.parse(getCookie('55UserInformations')) : {};
		
		if(typeof userInformations.name != 'undefined'){
		
			$('#shippingForm #name').val(userInformations.name);
			$('#shippingForm #adress').val(userInformations.adress);
			$('#shippingForm #zip').val(userInformations.zip);
			$('#shippingForm #city').val(userInformations.city);
			
		}

		// Loop to display all the products in the basket
		cart55.forEach(function(travel){
			$('#checkoutTable').append('<tr>\
					<td>'+travel.id+'</td>\
					<td>'+travel.category+'</td>\
					<td>'+capitalizeFirstLetter(travel.name)+'</td>\
					<td class="singlePrice">$'+travel.price+'</td>\
					<td>'+travel.quantity+'</td>\
					<td class="totalPrice">$'+travel.price * travel.quantity+'</td>\
				</tr>');
		});
		
		// Calculation of the total basket price
		$('#checkoutTable').append(
			'<tr><td id="checkoutPrice" colspan=6>Total Price : $'+calculate($('.totalPrice'))+'</td></tr>');
		
		$('#confirmReservation').html('<a  class="btn btn-primary" href="thankyou.html?price='+calculate($('.totalPrice'))+'">Continue to payment</a>');
		
		$('#confirmReservation').on('click', function(e){
			if($('#paymentMethod').css('display') ==='block'){

				var cardNum =parseInt($('#paymentMethod #cardNum').val()),
				expiration =parseInt($('#paymentMethod #expiration').val()),
				security =parseInt($('#paymentMethod #security').val());
				
				if(!cardNum || !expiration || !security || cardNum == '' || expiration =='' || security == ''){
					e.preventDefault();
					$("#errareMSG").html('<p>Please fill the payment informations correctly</p>');
					$("#errareMSG").show(500).delay(5000).hide(500);
				}
				
			} else{
			
			e.preventDefault();
			var name = $('#shippingForm #name').val(),
			adress = $('#shippingForm #adress').val(),
			zip = $('#shippingForm #zip').val(),
			city = $('#shippingForm #city').val();
			
			if(name != '' && adress!='' && zip != '' && city != ''){
				userInformations = {
					'name':name,
					'adress':adress,
					'zip':zip,
					'city':city
				}

				document.cookie = '55UserInformations=' + JSON.stringify(userInformations)+ ';path=/';

				$('#shippingForm #name').attr('readonly', true);
				$('#shippingForm #adress').attr('readonly', true);
				$('#shippingForm #zip').attr('readonly', true);
				$('#shippingForm #city').attr('readonly', true);

				$('#confirmReservation').html(
					'<a  class="btn btn-primary" id="submitButton" href="thankyou.html?price='+calculate($('.totalPrice'))+'"><h3>Confirm order</h3></a></td>');

				$('#paymentMethod').slideDown();

				/* tracking of virtual page view on payment page begin
				*/

				// tracking of virtual page view on payment page end
				history.pushState({}, 'Payment | ATS Travel Website', 'payment.html');
				var cart55 = getCookie('55Basket') ? JSON.parse(getCookie('55Basket')) : [];
				var products=[];
				cart55.forEach(function(travel){
					products.push({
						"item_id":travel.id,
						"item_category":travel.category,
						"price": travel.price,
						"item_name": travel.name,
						"quantity": travel.quantity,
						"item_variant":"6 nights"
					});
				});
				/* tracking of Ecommerce second checkout step action begin
				* use products JS variable to get the basket products details
				*/

				// tracking of Ecommerce second checkout step action end
				document.getElementById('submitButton').addEventListener('click',function(){
					/* tracking of Ecommerce payment checkout option action begin
					* use products JS variable to get the basket products details
					*/

					// tracking of Ecommerce payment checkout option action end
				});
			} else {
				$("#errareMSG").html('<p>Please complete all the required fields</p>');
				$("#errareMSG").show(500).delay(5000).hide(500);
			}
			
			}
			
		});
	}

	// Order confirmation
	if(/thankyou\.html/.test(window.location.pathname)){
		$('#navBasketItems span').text('');
		$('#orderConfirmed').prepend('<p>Order Reference : '+order55[order55.length -1].orderRef+'</p>');

		// Order cancellation
		$('#cancelOrder').on('click', function(e){
			var order55 = JSON.parse(getCookie('order55'));
			e.preventDefault();
			document.cookie = "55T=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
			$('#orderConfirmed').css('color','red').css('font-size','20px').html('<p>Order canceled<p>');
			$('#orderConfirmed').append(' <p><a href="destinations.html">Select destinations</a><p>');
			var cancelOrder = order55.pop();
			document.cookie = 'order55=' + JSON.stringify(order55)+ ';path=/';
			/* tracking of Ecommerce refund action begin
			* use cancelOrder.orderRef JS variable to get the canceled order Id
			*/

			// tracking of Ecommerce refund action end
		});
	}
		
	// Global script
	if(!!getCookie('55Basket')){
		var cart55 = JSON.parse(getCookie('55Basket'));
		if(cart55.length > 0){
			$('#navBasketItems span').text(' ('+cart55.length+')');
		} else {
			$('#navBasketItems span').text('');
		}
	} 
	
	// Newsletter subscription
	var input = $('#newsletter-form input[type="text"]');
	reponse = $('footer #reponse'),
	patt = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$','i');
	
	$('#newsletter-form form').on('submit', function(e){
		
		e.preventDefault();
		
		if(!!patt.test(input.val())){
			reponse.html('<p class="ok_msg">Thank you for joining our mailing list').fadeIn(500).delay(1500).fadeOut(500);
			/* tracking of newsletter subscription begin
			*/

			// tracking of newsletter subscription end
		} else {
			reponse.html('<p class="error_msg">Subscription failed, check your email adress').fadeIn(500).delay(1500).fadeOut(500);
		}
	 });
});