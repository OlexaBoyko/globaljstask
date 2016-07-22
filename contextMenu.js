var contextMenu = {
	
	makeMenu: function(jsonObject) {
		
		var menu = document.createElement("menu");
		menu.className= "menu";
		menu.id = jsonObject.id + "menuId";
		
		makeMenuFromJson(jsonObject);
		
		var subMenus= menu.querySelectorAll('.menu .menu');
		
	/*CREATE MENU functions*/
		
		//public function to make menu from JSON
		function makeMenuFromJson(jsonObject) {
			
			document.getElementById(jsonObject.id).appendChild(menu);
			document.getElementById(jsonObject.id).addEventListener('contextmenu', onContextMenu, false);
			
			var listEl = document.getElementById(menu.id);	
			makeMenu(jsonObject.menu,listEl);
		}
		
		//makes menu inside listElement
		function makeMenu(jsonObject, listElement) {
			
			for(var i in jsonObject) {
				var newLI = document.createElement('li');

				if  (jsonObject[i].sons){
					newLI.innerHTML = "<button type='button' class='menu-btn'><span class='menu-text'>"+ 
					jsonObject[i].name + "</span></button>";	
					
					var newMenu= document.createElement('menu');
					newMenu.className = "menu";
						
					newLI.className="menu-item submenu";		
					newLI.appendChild(newMenu);		
	
					makeMenu(jsonObject[i].sons,newMenu);
				}
				else {
					newLI.innerHTML="<button type='button' class='menu-btn'><span class='menu-text'>"+ jsonObject[i].name + "</span></button>";
					
					if(jsonObject[i].status==="disable") {
						newLI.className="menu-item disabled"
					} else
						newLI.className="menu-item";
					
					//reading onclick handler from JSON
					eval("var onclickfn="+jsonObject[i].onclick);
					newLI.addEventListener('click',onclickfn);		
				}
		
				newLI.id = jsonObject[i].id;
				listElement.appendChild(newLI);   
			}
		}
		
		
	/* CONTEXT MENU functions*/	
		//shows subMenus
		function showSubMenu(x,y) {
			
			for( var i=0; i < subMenus.length;i++) {
				
				var clickCoordsX = getPosition(subMenus[i]).x; 
				var clickCoordsY = getPosition(subMenus[i]).y;
				
				var menuWidth = subMenus[i].offsetWidth;// + 4;
				var menuHeight = subMenus[i].offsetHeight;// + 4;
							
				var windowWidth = window.innerWidth;
				var windowHeight = window.innerHeight;
				
				var impossibleShowContextMenu = ((windowWidth - clickCoordsX < menuWidth + subMenus[i].offsetParent.offsetWidth)
				&& (clickCoordsX < menuWidth + subMenus[i].offsetParent.offsetWidth));
				
				if ( (windowWidth - clickCoordsX) < menuWidth + subMenus[i].offsetParent.offsetWidth ) {
				  subMenus[i].style.left = '-99%'; 
				} else {
				  subMenus[i].style.left = '99%';
				}

				if ( (windowHeight - clickCoordsY) < menuHeight + subMenus[i].offsetParent.offsetHeight ) {
				  subMenus[i].style.top = '-99%';
				}  else {
				  subMenus[i].style.top =  "px";
				} 	
			}	
		}
				
		//shows context menu 
		//x,y mouse event coordinates
		function showMenu(x,y) {
			
			var clickCoordsX = x;
			var clickCoordsY = y;
			
			var menuWidth = menu.offsetWidth;// + 4;
			var menuHeight = menu.offsetHeight;// + 4;
			
			var windowWidth = window.innerWidth;
			var windowHeight = window.innerHeight;
			
			
			if ( (windowWidth - x) < menuWidth ) {
			  menu.style.left = windowWidth - menuWidth + "px";
			} else {
			  menu.style.left = x + "px";
			}

			if ( (windowHeight - y) < menuHeight ) {
			  menu.style.top = windowHeight - menuHeight + "px";
			} else {
			  menu.style.top = y + "px";
			}
			//show all submenus
			showSubMenu(clickCoordsX, clickCoordsY);
			
			menu.classList.add('show-menu');
		}
		
		//hides context menu
		function hideMenu() {
			menu.classList.remove('show-menu');
		}

		//right click event handler
		function onContextMenu(e) {
		
			e.preventDefault();
			defaultCss();
			showMenu(e.pageX, e.pageY);
			document.addEventListener('click', onClick, false);

		}

		//click event handler on our element
		function onClick(e) {
			hideMenu();
			document.removeEventListener('click', onClick);
		}
	


	/*ADDITIONAL functions */
	
		//return the position of element
		function getPosition(element) {
			var xPosition = 0;
			var yPosition = 0;
			
			while(element) {
				xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
				yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
				element = element.offsetParent;
			}
			return { x: xPosition, y: yPosition };
		}
		
		//changes value to default
		function defaultCss() {
			for( var i=0; i < subMenus.length;i++) {
				subMenus[i].style.left =  '0%';
				subMenus[i].style.top =  '4%';
			}
		}	
	}
	
}