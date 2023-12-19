let btnNovaTarefa = document.querySelector('.app__button--add-task')
let formularioTarefa = document.querySelector('.app__form-add-task')
let textArea = document.querySelector('.app__form-textarea')   
let ulTarefas = document.querySelector('.app__section-task-list')
let cancelaTextArea = document.querySelector('.app__form-footer__button--cancel')
let apagaTextArea = document.querySelector('.app__form-footer__button--delete')
let descricaoTextArea = document.querySelector('.app__section-active-task-description')

let removerConcluidas = document.querySelector('#btn-remover-concluidas')
let removerTodas = document.querySelector('#btn-remover-todas')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let tarefaSelecionada = null
let liTarefaSelecionada = null

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas)) 
}

apagaTextArea.addEventListener('click',() => {
    textArea.value = ''
})

cancelaTextArea.addEventListener('click', () => {
    textArea.value = '' //value pega o texto inserido na caixa  
    formularioTarefa.classList.add('hidden')
})

btnNovaTarefa.addEventListener('click', () => {
    formularioTarefa.classList.toggle('hidden') //no clique ele vem mas pode ir tbm
})

formularioTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault(); // a pagina nao recarrega na hora de salvar
    let tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa)
    let elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
    atualizarTarefas()
    textArea.value = ''
    formularioTarefa.classList.add('hidden')
})

function criarElementoTarefa(tarefa) {
    let li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    let svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `

    let paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    
    let botao = document.createElement('button')
    let botaoImagem = document.createElement('img')
    
    botao.onclick = () => {
        // debugger
        let novaDescricao = prompt("Qual o novo nome da tarefa?")
        // console.log('Nova descrição da tarefa: ',novaDescricao)
        if (novaDescricao) {
            paragrafo.textContent = novaDescricao
            tarefa.descricao = novaDescricao
            atualizarTarefas()
        }
    }

    botao.classList.add('app_button-edit')
    botaoImagem.setAttribute('src','imagens/edit.png')
    botao.append(botaoImagem)

    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete')    
        botao.setAttribute('disabled', 'disabled') 
    } else {
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active')
            .forEach(elemento => {
                elemento.classList.remove('app__section-task-list-item-active')
            })
            if (tarefaSelecionada == tarefa) {
                descricaoTextArea.textContent = ''
                tarefaSelecionada = null
                liTarefaSelecionada = null
                return
            }
    
            tarefaSelecionada = tarefa
            liTarefaSelecionada = li
            descricaoTextArea.textContent = tarefa.descricao
            li.classList.add('app__section-task-list-item-active')
        }
    }

    return li
}

tarefas.forEach(tarefa => {
    let elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
});

document.addEventListener('focoFinalizado', () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete')    
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')   
        tarefaSelecionada.completa = true 
        atualizarTarefas()
    }
})

let removerTarefas = (somenteCompletas) => {
    let seletor = somenteCompletas ? ".app__section-task-list-item-complete" : ".app__section-task-list-item"
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove()
    })
    tarefas = somenteCompletas ? tarefas.filter(elemento => !elemento.completa) : []
    atualizarTarefas()
}

removerConcluidas.onclick = () => removerTarefas(true)
removerTodas.onclick = () => removerTarefas(false)