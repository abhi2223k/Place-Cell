class Students{constructor(e){this.studentForm=e;this.convertToAJAX()}addStudent(e){let t=this;e.addEventListener("submit",(async n=>{n.preventDefault(),n.stopPropagation();const r=new FormData(e),o=Object.fromEntries(r.entries());if(""===o.name||""===o.age||""===o.gender||""===o.college||""===o.batch||""===o.dsa||""===o.react||""===o.webd)return t.notify("Please enter all the details 🤷‍♂️","error");const a=await fetch("/students/add",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}),s=await a.json();if("error"===s.status)return t.notify(s.message,"error");e.reset(),t.notify(s.message,"success");let l=t.createStudentInDOM(s.student),c=l.querySelector(".delete-student-button");t.addToSelection(s.student),t.toggleAccordion(l),t.deleteStudent(c)}))}addToSelection(e){let t=document.querySelectorAll(".interview-accordion-item");0!==t.length&&t.forEach((t=>{let n=t.querySelectorAll(".form-group select");0!==n.length&&n.forEach((t=>{if(t&&"name"===t.name){let n=document.createElement("option");n.value=e.id,n.textContent=e.name,t.appendChild(n)}}))}))}createStudentInDOM(e){let t=document.querySelectorAll("template")[0].content.cloneNode(!0).querySelector(".student-accordion-item");t.classList.add(`accordion-item-${e.id}`),t.querySelector(".accordion-header").id=`student-heading-${e.id}`;let n=t.querySelector(".accordion-button");n.textContent=e.name,n.setAttribute("data-bs-target",`#student-${e.id}`),n.setAttribute("aria-controls",`student-${e.id}`),"male"===e.gender&&(n.textContent+=" 👦"),"female"===e.gender&&(n.textContent+=" 👧");let r=t.querySelector(".accordion-collapse");r.id=`student-${e.id}`,r.setAttribute("aria-labelledby",`student-heading-${e.id}`),r.querySelector("img").src=`${e.avatar}`,r.querySelector("img").alt=`${e.name}`;let o=r.querySelectorAll(".student-data p");return o[0].querySelector("span").textContent=e.id,o[1].querySelector("span").textContent=e.name,o[2].querySelector("span").textContent=e.age,o[3].querySelector("span").textContent=e.gender,o[4].querySelector("span").textContent=e.college,o[5].querySelector("span").textContent=e.batch,o[6].querySelector("span").textContent=e.status,o[7].querySelector("span").textContent=e.dsa,o[8].querySelector("span").textContent=e.react,o[9].querySelector("span").textContent=e.webd,r.querySelector(".delete-student-button").setAttribute("data-id",e.id),document.getElementById("students").appendChild(t),t}deleteInterviews({students:e,companies:t,interviewIDs:n,studentID:r}){0!==t.length&&t.forEach((t=>{let o=document.querySelector(`.interview-accordion-item.accordion-item-${t._id}`);if(o)if(0===e.length){let e=o.querySelectorAll(".student");e&&e.length>0&&e.forEach((e=>e.remove()))}else{n.forEach((e=>{let t=o.querySelector(`.student-interview-${e}`);t&&t.remove()}));let e=o.querySelectorAll(".form-group select");e&&e.length>0&&e.forEach((e=>{let t=e.querySelectorAll("option");t&&t.length>0&&t.forEach((e=>{e&&e.value===r&&e.remove()}))}))}}))}deleteStudent(e){let t=this;e.addEventListener("click",(async e=>{e.preventDefault(),e.stopPropagation();const n=e.target.getAttribute("data-id"),r=await fetch(`/students/delete/${n}`,{method:"DELETE"}),o=await r.json();if("error"===o.status)return t.notify(o.message,"error");t.notify(o.message,"success"),t.deleteInterviews(o),e.target.closest(".student-accordion-item").remove()}))}toggleAccordion(e){e.querySelectorAll(".accordion-collapse").forEach((e=>{const t=e.previousElementSibling;t.children[0].addEventListener("click",(e=>{e.preventDefault(),e.stopPropagation(),"true"===e.target.getAttribute("aria-expanded")?(t.classList.add("round"),e.target.classList.add("round")):(t.classList.remove("round"),e.target.classList.remove("round"))}))}))}notify(e,t){new Noty({theme:"success"===t?"relax":"sunset",text:e,type:t,layout:"topRight",progressBar:!0,closeWith:["click","button"],timeout:6e3}).show()}convertToAJAX(){let e=this;document.querySelectorAll(".student-accordion-item").forEach((t=>{let n=t.querySelector(".delete-student-button");e.toggleAccordion(t),e.deleteStudent(n)})),e.addStudent(e.studentForm)}}try{const e=document.getElementsByClassName("student-form");Array.from(e).forEach((e=>{new Students(e)}))}catch(e){console.log(e)}