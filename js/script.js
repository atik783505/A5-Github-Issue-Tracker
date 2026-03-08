let allIssues = []


const createElements = (arr) => {
    const newHtml = arr.map((el) => `<span class="badge bg-amber-200 text-[12px]">${el}</span>`)
    return (newHtml.join(" "))
}

const toggleSpinner = (isLoading) => {

    const spinner = document.getElementById("loading-spinner")
    const cards = document.getElementById("card-container")

    if (isLoading) {
        spinner.classList.remove("hidden")
        cards.classList.add("hidden")
    }
    else {
        spinner.classList.add("hidden")
        cards.classList.remove("hidden")
    }
}

const loadData = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            allIssues = data.data

            getData(allIssues)

            updateCount(allIssues.length)
        })

}

const loadDetail = (id) => {
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
        .then(res => res.json())
        .then(data => getdetail(data.data))
}

const getdetail = (card) => {
    console.log(card)
    const detailsConatiner = document.getElementById('details-container')
    detailsConatiner.innerHTML = `
    <h2 class="text-[24px] font-bold">${card.title}</h2>
                <div class="flex gap-4">
                    <p class="badge ${card.status === 'open' ? 'bg-green-500' : 'bg-red-500'} text-white text-[12px] rounded-full">${card.status}</p>
                    <p class="text-[12px] text-[#64748B]">Opened by <span>${card.assignee}</span></p>
                    <p class="text-[12px] text-[#64748B]">${new Date(card.updatedAt).toLocaleDateString()}</p>
                </div>
                <div class="flex gap-2 mt-4">
                    ${createElements(card.labels)}
                </div>
                <p class="text-[12px] text-[#64748B] mt-5">${card.description}</p>
                <div class="flex gap-40 mt-6">
                    <div>
                        <p class="text-[12px] text-[#64748B]">Assignee:</p>
                        <p class="font-bold text-[16px]">${card.assignee}</p>
                    </div>
                    <div>
                        <p class="text-[12px] text-[#64748B]">Priority:</p>
                        <p class="badge ${card.priority === 'high' ? 'bg-red-500' : card.priority === 'medium' ? 'bg-amber-500' : 'bg-gray-500'} text-white text-[12px] rounded-full">${card.priority}</p>
                    </div>
                </div>
    `

    document.getElementById('my_modal').showModal()
}

const getData = (datas) => {
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ""
    datas.forEach(data => {
        const newdiv = document.createElement('div')
        newdiv.innerHTML = `
                <div onclick='loadDetail(${data.id})' class="card border-t-4 ${data.status === 'open' ? 'border-[#00A96E]' : 'border-[#A855F7]'} rounded-md h-full shadow-lg p-4 space-y-3">
                <div class="flex justify-between">
                    <img src="${data.status === 'open' ? './assets/Open-Status.png' : './assets/Closed- Status .png'}" alt="">
                    <p class="badge text-[12px] ${data.priority === 'high' ? 'bg-red-200 text-[#EF4444]' : data.priority === 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]' : 'bg-gray-200 text-gray-600'}">${data.priority}</p>
                </div>
                <h2 class="text-[14px] font-semibold">${data.title}</h2>
                <p class="line-clamp-2 text-[12px] text-[#64748B]">${data.description}</p>
                <div class="flex gap-2">
                    ${createElements(data.labels)}
                </div>
                <hr class="text-gray-300">
                  <div class="flex justify-between">
                    <p class="text-[#64748B] text-[12px]">#${data.id}  by ${data.author}</p>
                    <p class="text-[#64748B] text-[12px]">${new Date(data.createdAt).toLocaleDateString()}</p>
                </div>
                <div class="flex justify-between">
                    <p class="text-[#64748B] text-[12px]">assignee: ${data.assignee}</p>
                    <p class="text-[#64748B] text-[12px]">${new Date(data.updatedAt).toLocaleDateString()}</p>
                </div>
            </div>
        `
        cardContainer.appendChild(newdiv)
    })
}

const updateCount = (count) => {

    document.getElementById("issue-count").innerText = count

}

const filterIssues = (status, event) => {
    document.querySelectorAll(".btn").forEach(btn => btn.classList.remove("btn-primary"));
    event.target.classList.add("btn-primary");

    toggleSpinner(true)

    setTimeout(() => {

    const filtered = status === "all"
        ? allIssues
        : allIssues.filter(issue => issue.status === status);

    getData(filtered);
    updateCount(filtered.length);

    toggleSpinner(false)

    }, 300)
};

loadData()