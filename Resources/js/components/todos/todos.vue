<template>
    <div>
        <div class="row">
            <div class="col-xs-12">
                <h1>Things I need to do</h1>
                <ul v-if="todos.length">
                    <li v-for="item in todos" :key="item.id">
                        {{item.description}} –
                        <button v-on:click="completeItem(item)" class="btn btn-link">
                            Completed
                        </button>
                    </li>
                </ul>
                <p v-else class="text-success">Nothing to do right now!</p>
            </div>
        </div>
        
        <form>
            <div class="row">
                <div class="col-xs-6">
                    <input v-model="newItemDescription" class="form-control"
                                        placeholder="Add Items...">
                </div>
                <button v-on:click="addItem($event)" class="btn btn-primary">
                    Add
                </button>
            </div>
        </form>


        <hr />
        <div class="row">
            <div class="col-xs-12">
                <h2>Things I have done</h2>
                <ul v-if="dones.length">
                    <li v-for="item in dones" :key="item.id">
                        {{item.description}} -
                        <button v-on:click="deleteItem(item)" class="btn btn-link">
                            Delete
                        </button>
                    </li>
                </ul>
                <p v-else class="text-danger">I have done nothing!</p>
            </div>
        </div>
        
    </div>
</template>
<script src="./todos.ts"></script>
