import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import axios from 'axios';

interface TodoItem {
    description: string;
    done: boolean;
    id: string;
}
 
@Component
export default class TodoComponent extends Vue {
    todos: TodoItem[];
    dones: TodoItem[];
    newItemDescription: string|null;
 
    data() {
        return {
            todos: [],
            dones: [],
            newItemDescription: null
        };
    }

    mounted() {
        axios.get('/api/todo', {
            params: {
                done: false
            }
        })
            .then(response => response.data as Promise<TodoItem[]>)
            .then(data => {
                this.todos = data;
            });

        axios.get('/api/todo', {
            params: {
                done: true
            }
        })
            .then(response => response.data as Promise<TodoItem[]>)
            .then(data => {
                this.dones = data;
            });
    }

    addItem(event: any) {

        if (event) {
            event.preventDefault();
        }

        axios.post('/api/todo', {
            description: this.newItemDescription
        })
            .then(response => response.data as Promise<TodoItem>)
            .then((newItem) => {
                this.todos.push(newItem);
                this.newItemDescription = null;
            });
    }

    completeItem(item: TodoItem) {
        axios.put(`/api/todo/${item.id}`)
            .then(() => {
                this.todos = this.todos.filter((t) => t.id !== item.id);
                this.dones.push(item);
            });
    }

    deleteItem(item: TodoItem) {
        axios.delete(`/api/todo/${item.id}`)
            .then(() => {
                this.dones = this.dones.filter((t) => t.id !== item.id);
            });
    }

}
