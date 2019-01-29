import React, { Component } from 'react';

import AppHeader from './components/app-header/app-header';
import SearchPanel from './components/search-panel/search-panel';
import TodoList from './components/todo-list/todo-list';
import './style/style.css'
import ItemStatusFilter from './components/item-status-filter/item-status-filter';
import ItemAddForm from './components/item-add-form/item-add-form';
import Login from './components/modal/modal'


class App extends Component {

    maxId = 100
  state = {
    todoDate : [
		this.creteTodoIte('Drink Coffee'),
		this.creteTodoIte('Make Awesome App'),
		this.creteTodoIte('Have a lunch')
    ],
    term:'',
    filter:'all',
    email: '',
    password: ''

  }

  creteTodoIte(label){
    return{
		label,
		important: false,
		done: false,
		id: this.maxId++
    } 
  }

  deleteItem = id => {
    this.setState(({todoDate})=>{
      const idx = todoDate.findIndex(el => el.id === id)

      const newArray = [
        ...todoDate.slice(0, idx),
        ...todoDate.slice(idx + 1)
      ]
      return {todoDate: newArray}
    })
  }

  addItem = (text) =>{
        // console.log(text)
        const newItem = this.creteTodoIte(text)
        this.setState(({ todoDate }) => {
            const newArr = [
                ...todoDate,
                newItem
            ]
            return {
                todoDate: newArr
            }
        })
  }

toggleProperty(arr, id, propName){
    const idx = arr.findIndex(el => el.id === id)
    const oldItem = arr[idx]
    const newItem = {...oldItem, 
    [propName]: !oldItem[propName]}
    return [
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1)
    ]
}

  onToggleImportant = id => {
      this.setState(({todoDate})=>{
    return {
        todoDate: this.toggleProperty(todoDate, id, 'important')
    }
 })
  }

 onToggleDone = id =>{
     this.setState(({todoDate})=>{
        return {
            todoDate: this.toggleProperty(todoDate, id, 'done')
        }
     })
 }
 
 search = (items, term) => {
     if(term.length === 0){
         return items
     }
     return items.filter(item=>{
         return item.label
         .toLowerCase()
         .indexOf(term.toLowerCase())>-1
     })
 }
 onSearchChange = (term)=>{
    this.setState({term})
 }
 onFilterChange = (filter)=>{
    this.setState({filter})
 }
 onFilterChange
 filter(items, filter){
     switch (filter) {
         case 'all':
             return items;
        case 'active':
            return items.filter(item=>!item.done);
        case 'done':
            return items.filter(item=>item.done)
        default:
            return items;
     }
 }
 login =(email, password) => {
     this.setState({email, password})
     

 }
  render() {

    const {todoDate, term, filter} =this.state

    const visibleItems = this.filter(this
        .search(todoDate, term),filter)

    const doneCount = todoDate
        .filter(el=>el.done).length

    const todoCount = todoDate.length - doneCount

    
    return (
      <div className="App">
        <div className="todo-app">
            <Login 
            login={this.login}
            />
            <AppHeader toDo={todoCount} done={doneCount}/>
            <div className="top-panel d-flex"> 
                <SearchPanel
                onSearchChange={this.onSearchChange}
                />
                <ItemStatusFilter
                filter={filter}
                onFilterChange={this.onFilterChange}
                />
            </div>

            <TodoList 
              obj={visibleItems}
              onDeleted={this.deleteItem}
              onToggleImportant={this.onToggleImportant}
              onToggleDone={this.onToggleDone}
              />

              <ItemAddForm onItemAdded={this.addItem}/>
        </div>
      </div>
    );
  }
}

export default App;
