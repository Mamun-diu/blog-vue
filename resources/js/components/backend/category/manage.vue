<template>
    <div>
        <!-- Main content -->
        <section class="content pt-3">
            <div class="container-fluid">
                <div class="row no-gutters">
                    <div class="col-md-10 offset-md-1">
                        <div class="card">
                            <div class="card-header ">
                                <h3 class="card-title ">Categories</h3>
                                <select @change="changeAll" v-model="select" v-if="categoryIds.length>0" class="ml-3 w-25 d-inline-block form-control">
                                    <option value="noSelect">--select--</option>
                                    <option value="selectActive">Active</option>
                                    <option value="selectInactive">Inactive</option>
                                    <option value="selectDelete">Delete</option>
                                </select>
                                <router-link to="/add-category" class="btn btn-sm btn-info float-right">Add Category</router-link>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body p-0">
                                <table class="table table-sm table-bordered">
                                    <thead>
                                        <tr>
                                            <th>
                                                <input v-model="checkValue"   type="checkbox"  @click="check">
                                            </th>
                                            <th>SL#</th>
                                            <th>Name</th>
                                            <th>Slug</th>
                                            <th>Status</th>
                                            <th >CreatedAt</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(category,index) in getCategories" :key="index">
                                            <td><input @click="checkSelect" v-model="categoryIds" :value="category.id" type="checkbox"></td>
                                            <td>{{ ++index }} </td>
                                            <td>{{ shortString(category.name) }} </td>
                                            <td>{{ shortString(category.slug) }} </td>
                                            <td>
                                                <span v-if="category.status==1" class="badge badge-primary">Active</span>
                                                <span v-else class="badge badge-danger">Inactive</span>
                                            </td>
                                            <td>{{ time(category.created_at) }} </td>

                                            <td>
                                                <router-link :to="{name:'editCategory', params:{id: category.id}}" class="btn btn-sm btn-outline-info" >Edit</router-link>
                                                <button @click="removeCategory(category.id)" type="button" class="btn btn-sm btn-outline-danger">Delete</button>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                            <!-- /.card-body -->
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "manage",
    data(){
        return{
            categoryIds: [],
            checkValue: false,
            select: 'noSelect',
        }
    },
    methods: {
        checkSelect(){
            setTimeout(() => {
                if(this.categoryIds.length == this.getCategories.length){

                    this.checkValue = true;
                }else{

                    this.checkValue = false;
                }
            }, 1);
        },
        removeCategory(id){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/api/category/${id}`)
                    .then(() =>{
                        this.$store.dispatch("receivedCategory");
                        toastr.success('Category deleted successfully');
                    })

                }
            })

        },
        check(){
            setTimeout(() => {
                if(this.checkValue==true){
                    this.categoryIds = [];
                    for (const cat of this.getCategories) {
                        this.categoryIds.push(cat.id);

                    }
                }else{
                    this.categoryIds=[];
                }
            }, 2);

        },
        changeAll(){
            if(this.select == "selectDelete"){
                Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.isConfirmed) {
                    let i = 0;
                    for (const id of this.categoryIds) {
                        i++
                        axios.delete(`/api/category/${id}`)
                        .then(() =>{
                            this.$store.dispatch("receivedCategory");
                            this.categoryIds = []
                            this.select= 'noSelect'
                            this.checkValue = false;
                        })
                    }
                    toastr.success(i+' item has been deleted');


                }
            })


            }else if(this.select == "selectActive"){
                let i = 0;
                for (const id of this.categoryIds) {
                    i++
                    axios.put(`/api/category/active/${id}`,{name:'Mamun'})
                    .then(() =>{
                        this.$store.dispatch("receivedCategory");
                        this.categoryIds = []
                        this.select= 'noSelect'
                        this.checkValue = false;
                    })
                }
                toastr.success(i+' item has been changed to Activate');

            }else if(this.select == "selectInactive"){
                let i = 0;
                for (const id of this.categoryIds) {
                    i++
                    axios.put(`/api/category/inactive/${id}`,{name:'Mamun'})
                    .then(() =>{
                        this.$store.dispatch("receivedCategory");
                        this.categoryIds = []
                        this.select= 'noSelect'
                        this.checkValue = false;
                    })
                }
                toastr.success(i+' item has been changed to Inactivate');

            }
        },
        time(t){
            return moment(t).format("dddd, MMMM Do YYYY")
        },
        shortString(s){
            if(s.length > 15){
                return s.slice(0,15)+" ...";
            }
            else{
                return s;
            }

        },
    },
    computed: {
        getCategories(){
            return this.$store.getters.categories;
        }
    },
    mounted() {
        this.$store.dispatch("receivedCategory");
    },
};
</script>

<style>

</style>
