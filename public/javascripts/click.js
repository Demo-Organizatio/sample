$(document).ready(function()
{
	$('.del').click(function() {
       var val=$(this).val();
       $.post('/del',{"no":val},function(data){
     	   alert("successfully deleted");
     	   location.reload('/home')
     });
    });
    $('.edit').click(function()
    {
    	
    	var a=$(this).val();
    	$.post('/edit',{va:a},function(data){
    		var a=JSON.stringify(data);
    		var b=JSON.parse(a);
            alert(b)
    		$('#name').val(b[0].name);	
    		$('#no').val(b[0].rollno);
    		$('#do').val(b[0].dob);

    		$('#ph').val(b[0].ph); 
    		$('#addr').val(b[0].address);    		
    	});
    	$('.dondisplay').show();
    });
});
