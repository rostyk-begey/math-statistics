

<!-- // Begin JavaScript Hiding ...

function calcFunction(form)
{
var x, df, p;
// Read in two values from input boxes
x = form.txtValue1.value;
df = form.txtValue2.value;
// Make sure they are numbers
x = Number(x);
df = Number(df);
// Compute the result
p = chidist(x, df);
if (p < 0) p = NaN;
document.getElementById('tbc2Result').innerHTML = p.toFixed(5);
	document.getElementById('tbrResult').style.visibility = (isNaN(p) ? 'hidden' : 'visible');
}

function calcFunctionInv(form)
{
	var x, df, p;
	// Read in two values from input boxes
	p = form.txtValue3.value;
	df = form.txtValue4.value;
	// Make sure they are numbers
	p = Number(p);
	df = Number(df);
	// Compute the result
	x = chi2inv(p, df);
	if (x < 0) x = NaN;
	document.getElementById('tbc2Result1').innerHTML = x.toFixed(5);
	document.getElementById('tbrResult1').style.visibility =  (isNaN(x) ? 'hidden' : 'visible');
}

var winOptions = "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width=850, height=600";

function showgraphx(form)
{
	var x, df, p;
	x = Number(form.txtValue1.value);
	df = Number(form.txtValue2.value);
	var qs = "x=" + x + "&df=" + df;
	//alert(qs);
	var w = window.open("chisquare-graph.html?" + qs, "", winOptions);
	w.focus();
}
function showgraphp(form)
{
	var x, df, p;
	p = Number(form.txtValue3.value);
	df = Number(form.txtValue4.value);
	x = chi2inv(p, df);
	if (x < 0)
	{
		alert("Invalid parameters");
		return;
	}
	var qs = "x=" + x + "&df=" + df;
	//alert(qs);
	var w = window.open("chisquare-graph.html?" + qs, "", winOptions);
	w.focus();
}

// ... End JavaScript Hiding -->
