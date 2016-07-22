window.onload= function() {
	
	//initialize Context MENU with JSON
	var jsonMenu = {
		"id": "link",
		"menu": [
			{
				"name": "item1",
				"id": "item1",
				"status": "enable",
				"onclick": "function() {alert('item1');}" ,
			},
			{
				"name": "item2",
				"id": "item2",
				"status": "enable",
				"onclick": "function() {alert('item2');}" ,
			},
			{
				"name": "item3",
				"id": "item3",
				"status": "disable",
				"onclick": "function() {alert('item3');}"  
			},
			{
				"name": "item4",
				"id": "item4",
				"status": "enable",
				"sons": [
					{
						"name": "item5",
						"id": "item5",
						"status": "disable",
						"onclick": "function() {alert('item5');}"  
					},
					{
						"name": "item6",
						"id": "item6",
						"status": "enable",
						"sons": [
									{
										"name": "item7",
										"id": "item7",
										"status": "enable",
										"onclick": "function() {alert('item7');}" ,
									},
									{
										"name": "item8",
										"id": "item8",
										"status": "enable",
										"onclick": "function() {alert('item8');}"  
									},
						
						
								]
						
					}
				]
			},
			{
				"name": "item9",
				"id": "item9",
				"status": "enable",
				"onclick": "function() {alert('item9');}"  
			}
			
		]
	}
	
	var jsonMenu2 = {
		"id": "link2",
		"menu": [
			{
				"name": "Open",
				"id": "openId",
				"status": "enable",
				"onclick": "function() {alert('open');}" ,
			},
			{
				"name": "Save",
				"id": "saveId",
				"status": "enable",
				"onclick": "function() {alert('save');}" ,
			},
			{
				"name": "Copy",
				"id": "copyId",
				"status": "disable",
				"onclick": "function() {alert('copy');}"  
			},
			{	"name": "Social",
				"id": "socialId",
				"status": "enable",
				"sons": [
					{
						"name": "Share",
						"id": "shareId",
						"status": "disable",
						"onclick": "function() {alert('Shared');}"  
					}
				]
			}
		]
	}
	
	contextMenu.makeMenu(jsonMenu);
	contextMenu.makeMenu(jsonMenu2);
	
}