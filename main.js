var questions = [];
var ind = 0;
var points = 0;
var remark = "";



function renderQuestion(){
    document.getElementById("qwrap").innerHTML = `
    <div class="question-box">
    <span class="dot"></span>
    <p id="qCount">Question ${ind+1} of ${questions.length}</p>
    <div class="questions">
        
        <p id="question">${questions[ind].question}</p>
        <div class="options">
            <button class="yes" onclick="addPoint(${parseInt(questions[ind].point)})">Yes</button>
            <button  class="no" onclick="addPoint(${0})" >No</button>
        </div>
    </div>
    </div>
    `
}


function analysePoints(){
    console.log(points)
    switch(points){
        case 0:
        case 1:
        case 2:
            remark = "Your symptoms may be stress related, rest and observe yourself."
            break;
        case 3:
        case 4:
        case 5:
            remark = "Hydrate properly and maintain personal hygiene.\nObserve and Re-evaluate after 2 days."
            break;
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
            remark = "Seek consultation with a Doctor"
            break;
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
            remark = "Call the DOH Hotline 02-8-651-7800"
            break;
        default:
            remark = "Unable to analyse your symptoms"
            break ;    
    }
    return remark
}

function addPoint(p){
    if(ind != questions.length -1){
        if(p != 0){
            points += p;
        }
        ind += 1
        renderQuestion()
    }else{
        var rem = analysePoints();
        document.getElementById("qwrap").innerHTML = `
        <div class="question-box">
					<span class="dot"></span>
					<p>Result</p>
					<div class="result">
						<p class="result">${rem}</p>
						<div class="options">
							<button class="yes" onclick="window.location.reload()">Reload</button>
						</div>
					</div>
				</div>
    `
        document.getElementById('header-text').innerHTML = `
        <h1>Covid 19 Self Test</h1>
		<p>Thanks for taking the test and do share with your friends, so they can use the test too.</p>
        `
    }
}

function startTest(){
    var url = "https://gdgcovidtracker.herokuapp.com/v1/questions"
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        if(data.status == "success"){

            questions = data.questions;

            document.getElementById("loader").style.display = 'none';

            document.getElementById("start").disabled = true;

            renderQuestion()
           
        }
    })
}
