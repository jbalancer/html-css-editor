function message(text)
{
	if (настройки.уведомления == "включить")
	{
		var
			mesCon  = document.querySelector('#message .messages-wrapper'),
			mesItem = document.createElement('div');

		mesItem.setAttribute('class', 'mes-item gradient');
		mesItem.innerHTML = '<span class="mes-text">' + text.trim() + '</span>';

		mesItem.onclick = function ()
		{
			mesItem.style.animation = 'hide .3s ease-in-out';
			
			setTimeout(function() {
				mesItem.remove();
			}, 300);
		}

		setTimeout(function() {
			mesItem.style.animation = 'hide .3s ease-in-out';		
		}, 2000);

		setTimeout(function() {
			mesItem.remove();
		}, 2300);

		mesCon.appendChild(mesItem);
	}
	else if (настройки.уведомления == "отключить")
	{
		return;
	}
}