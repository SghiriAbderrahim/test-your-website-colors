// toggle dark and light mode
const modeToggle = document.querySelector('.modeContainer');
const bodyClassList = document.querySelector('body').classList;

const toggleMode = () => {
   if (bodyClassList.contains('dark')) {
      bodyClassList.replace('dark', 'light');
      localStorage.setItem('Mode', 'light');
   } else {
      bodyClassList.replace('light', 'dark');
      localStorage.setItem('Mode', 'dark');
   }
};

modeToggle.addEventListener('click', toggleMode);

if (localStorage.getItem('Mode')) {
   document.body.classList.add(localStorage.getItem('Mode'));
} else {
   document.body.classList.add('dark');
}




//   the list of the projects
if (localStorage.getItem('Projects')) {
   var projects = JSON.parse(localStorage.getItem('Projects'));
} else {
   var projects = [{
      name: 'Default Project',
      colors: [
         {
            title: 'background',
            color: '#110011'
         },
         {
            title: 'navbar',
            color: '#110011'
         },
         {
            title: 'text',
            color: '#ffffff'
         },
         {
            title: 'theme',
            color: '#03fcfc'
         },
         {
            title: 'selected',
            color: '#331133'
         },
         {
            title: 'secondary text',
            color: '#808080'
         },
      ]
   }];
}
// set the projects in the local storage
function setProjects() {
   localStorage.setItem('Projects', JSON.stringify(projects));
}
// monitor color change
function colorChange(newColor, colorIndex, projectIndex) {
   projects[projectIndex].colors[colorIndex].color = newColor;
   showColors(projectIndex);
   setColorsInSimilarSite(projectIndex);
   setProjects();
}
// showing the list of colors in the colors div
function showColors(projectIndex) {
   const colorsDiv = document.querySelector('.colors');
   colorsDiv.innerHTML = '';
   projects[projectIndex].colors.forEach((item, i) => {
      colorsDiv.innerHTML += ` 
      <div class="colorContainer">
       <div class="colorDiv">
       <label >
       <div  class="colorSquare" style="--color:${item.color}"></div>
       <input type="color" value="${item.color}" onchange="colorChange(this.value,${i},${projectIndex})">
   </label>
   </div>
       <h5 class="colorTitle">${item.title}</h5>
       <button class="copy" onclick="copyColor(${i},${projectIndex})">
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
</svg>
       </button>
   </div>
   `;
   })
}
showColors(0);
// 
function setColorsInSimilarSite(projectIndex) {
   let similarSite = document.querySelector('.similarSite');
   let selected = projects[projectIndex].colors;
   let colorForm = `
   --similar-bg: ${selected[0].color};
   --similar-nav: ${selected[1].color};
   --similar-tx: ${selected[2].color};
   --similar-theme-color: ${selected[3].color};
   --similar-selected-color: ${selected[4].color};
   --similar-secondary-tx: ${selected[5].color};
   `;
   similarSite.style = colorForm;

}
setColorsInSimilarSite(0);
// hide or show the projects section
function toggleProjects(order) {
   const projectsContainer = document.querySelector('.projectsContainer');
   if (order === 'show') {
      projectsContainer.style.display = 'flex';
   } else {
      projectsContainer.style.display = 'none';
   }
   showingProjects();
}

// selected Project
var selectedProjectIndex = 0;

// showing the projects in the projects div
function showingProjects() {
   const projectsDiv = document.querySelector('.projects');
   projectsDiv.innerHTML = '';
   projects.forEach((item, i) => {
      projectsDiv.innerHTML += `
         <div class="project ${(i == selectedProjectIndex) ? 'selected' : ''}" >
        <input type="button" onclick="selectProject(${i})"  class="name" value="${item.name}" >
        <button class="save" onclick="saveName(${i})" >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022"/>
</svg>
        </button>
        <button class="edit" onclick="enableEdit(${i})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path
              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fill-rule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
          </svg></button>
        <button class="remove" onclick="removeProject(${i})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-trash" viewBox="0 0 16 16">
            <path
              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
            <path
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
          </svg></button>

      </div>
         `;
   })
   setProjects();
}
showingProjects();
// add a new project
function addNewProject() {
   projects.unshift({
      name: 'New Project',
      colors: [
         {
            title: 'background',
            color: '#110011'
         },
         {
            title: 'navbar',
            color: '#110011'
         },
         {
            title: 'text',
            color: '#ffffff'
         },
         {
            title: 'theme',
            color: '#03fcfc'
         },
         {
            title: 'selected',
            color: '#331133'
         },
         {
            title: 'secondary text',
            color: '#808080'
         },
      ]
   });
   showingProjects();
}
// remove th project
function removeProject(index) {
   projects.splice(index, 1);
   if (projects.length == 0) {
      projects.unshift({
         name: 'Default Project',
         colors: [
            {
               title: 'background',
               color: '#110011'
            },
            {
               title: 'navbar',
               color: '#110011'
            },
            {
               title: 'text',
               color: '#ffffff'
            },
            {
               title: 'theme',
               color: '#03fcfc'
            },
            {
               title: 'selected',
               color: '#331133'
            },
            {
               title: 'secondary text',
               color: '#808080'
            },
         ]
      });
   }


   selectedProjectIndex = 0;
   showProjectName(0);
   setColorsInSimilarSite(0);
   showColors(0);


   showingProjects();

}
// enable edit the project name
function enableEdit(index) {
   showingProjects();
   const saveButton = document.querySelectorAll('.save');
   saveButton[index].style.display = 'block';
   const nameProjectList = document.querySelectorAll('.name');
   nameProjectList[index].type = 'text';
   nameProjectList[index].onclick = '';
   nameProjectList[index].focus();
}
// save the new name
function saveName(index) {
   const nameProjectList = document.querySelectorAll('.name');
   let value = nameProjectList[index].value;
   projects[index].name = value;
   showingProjects();
}

// select the project
function selectProject(index) {
   selectedProjectIndex = index;
   showProjectName(index);
   setColorsInSimilarSite(index);
   showColors(index);
   toggleProjects('hide');
}
// show project name
function showProjectName(index) {
   const projectNameDiv = document.querySelector('.projectName');
   projectNameDiv.innerHTML = projects[index].name;
}
showProjectName(0);

// copy the color
function copyColor(colorIndex, projectIndex) {
   var colorValue = projects[projectIndex].colors[colorIndex].color
   if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(colorValue);
      copySuccess(colorIndex);
   } else {
      unsecuredCopyToClipboard(colorValue, colorIndex);
   }
};

const unsecuredCopyToClipboard = (text, colorIndex) => {
   const textArea = document.createElement("textarea");
   textArea.value = text;
   document.body.appendChild(textArea);
   textArea.focus();
   textArea.select();
   try {
      document.execCommand('copy')
      copySuccess(colorIndex);
   } catch (err) {
      console.error('Unable to copy to clipboard', err);
      alert(`copy it here : ${text}`);
   }
   document.body.removeChild(textArea);
};

const copySuccess = (index) => {
   const copyButtons = document.querySelectorAll('.copy');
   copyButtons[index].classList.add('copied');
   setTimeout(() => {
      copyButtons[index].classList.remove('copied');
   }, 700)
}