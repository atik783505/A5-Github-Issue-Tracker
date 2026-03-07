const createElements = (arr) => {
    const newHtml = arr.map((el) => `<span class="badge bg-amber-200 text-[12px]">${el}</span>`)
    return (newHtml.join(" "))
}

const loadData = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => getData(data.data))

}

const getData = (datas) => {
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ""
    datas.forEach(data => {
        const newdiv = document.createElement('div')
        newdiv.innerHTML = `
                <div class="card border-t-4 ${data.status === 'open' ? 'border-[#00A96E]' : 'border-[#A855F7]'} rounded-md h-full shadow-lg p-4 space-y-3">
                <div class="flex justify-between">
                    <img src="${data.status === 'open' ? './assets/Open-Status.png' : './assets/Closed- Status .png'}" alt="">
                    <p class="badge text-[12px] ${data.priority === 'high' ? 'bg-red-200 text-[#EF4444]' : data.priority === 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]' : 'bg-gray-200 text-gray-600' }">${data.priority}</p>
                </div>
                <h2 class="text-[14px] font-semibold">${data.title}</h2>
                <p class="line-clamp-2 text-[12px] text-[#64748B]">${data.description}</p>
                <div class="flex gap-2">
                    ${createElements(data.labels)}
                </div>
                <hr class="text-gray-300">
                  <div class="flex justify-between">
                    <p class="text-[#64748B] text-[12px]">#${data.id}  by ${data.author}</p>
                    <p class="text-[#64748B] text-[12px]">${data.createdAt}</p>
                </div>
                <div class="flex justify-between">
                    <p class="text-[#64748B] text-[12px]">assignee: ${data.assignee}</p>
                    <p class="text-[#64748B] text-[12px]">${data.updatedAt}</p>
                </div>
            </div>
        `
        cardContainer.appendChild(newdiv)
    })
}

loadData()