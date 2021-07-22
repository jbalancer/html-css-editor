$(document).ready(function(){
	var taActive = false,
		code     = '';

	if (настройки.функциональность.очистка == "да") {
		$('#clear-code').css('display','block');
	}else if (настройки.функциональность.очистка == "нет") {
		$('#clear-code').remove();
	}

	if (настройки.функциональность.копирование == "да") {
		$('#copy-code').css('display','block');
	}else if (настройки.функциональность.копирование == "нет") {
		$('#copy-code').remove();
	}

	if (настройки.функциональность.сохранение == "да") {
		$('#save-code').css('display','block');
	}else if (настройки.функциональность.сохранение == "нет") {
		$('#save-code').remove();
	}

	function viewHtml() {
		if (taActive === false) {
			$('#preview').removeClass('gradient');
			$('#preview .preview-wrapper').css('position','static');
			$('#preview .preview-favicon').remove();
			taActive = true;
		}		
		$('#preview .preview-wrapper').html($('#htmlcode').val());
	}

	function viewCss() {
		if (taActive === false) {
			$('#preview').removeClass('gradient');
			$('#preview .preview-wrapper').css('position','static');
			$('#preview .preview-favicon').remove();
			taActive = true;
		}		
		$('#style-code').html($('#csscode').val());
	}

	if (настройки.превью == "динамическое") {
		$('#htmlcode').on('keyup', viewHtml);
		$('#csscode').on('keyup', viewCss);
	} else if (настройки.превью == "статическое") {
		$('#htmlcode').on('blur', viewHtml);
		$('#csscode').on('blur', viewCss);
	}	

	$('#clear-code').on('click', function(){
		$('#htmlcode').val('');
		$('#csscode').val('');
		message('Код очищен!');
	});
	$('#copy-code').on('click', function(){
		code = 'HTML: --- ' + $('#htmlcode').val() + "\n" + 'CSS: --- ' + $('#csscode').val();		
		message('Код скопирован в буфер обмена!');
	});	
	new ClipboardJS('#copy-code', {
        text: function() {
            return code;
        }
    });
	$('#save-code').on('click', function(){
		var allCode = {
			html: $('#htmlcode').val(),
			css: $('#csscode').val()
		};
		allCode = JSON.stringify(allCode);
		window.localStorage.setItem('data',allCode);
		message('Код успешно сохранён!');
	});
	if (window.localStorage.getItem('data')) {
		var saveReturn = confirm('У вас есть сохранённые данные, загрузить их ?');
		if (saveReturn) {
			taActive = true;
			var data = window.localStorage.getItem('data');
			data = JSON.parse(data);
			$('#htmlcode').val(data.html);
			$('#csscode').val(data.css);
			$('#preview').removeClass('gradient');
			$('#preview .preview-wrapper').css('position','static');
			$('#preview .preview-favicon').remove();
			$('#preview .preview-wrapper').html(data.html);
			$('#style-code').html(data.css);
		}
	}
});