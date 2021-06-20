<template>
    <div>
        <!-- Main content -->
        <section class="content pt-3">
            <div class="container-fluid">
                <div class="row no-gutters">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header ">
                                <h3 class="card-title ">Manage Posts</h3>
                                <select @change="changeAll" v-model="select" v-if="postIds.length>0" class="ml-3 w-25 d-inline-block form-control">
                                    <option value="noSelect">--select--</option>
                                    <option value="selectActive">Publish</option>
                                    <option value="selectInactive">Draft</option>
                                    <option value="selectDelete">Delete</option>
                                </select>
                                <router-link to="/add-post" class="btn btn-sm btn-info float-right">Add Post</router-link>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body p-0">
                                <table class="table table-sm table-bordered">
                                    <thead>
                                        <tr>
                                            <th>
                                                <input v-model="checkValue"   type="checkbox" value="false" @click="check">
                                            </th>
                                            <th>SL#</th>
                                            <th>Thumbnail</th>
                                            <th>Title</th>
                                            <th>Category</th>
                                            <th>Writter</th>
                                            <th>Content</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(post,index) in getPosts" :key="index">
                                            <td><input @click="checkSelect" v-model="postIds" :value="post.id" type="checkbox"></td>
                                            <td>{{ ++index }} </td>
                                            <td><img width="50" :src="post.thumbnail" alt="img"> </td>
                                            <td>{{ shortString(post.title) }} </td>
                                            <td>{{ post.category.name }} </td>
                                            <td>{{ post.user.name }} </td>
                                            <td>{{ shortString(post.content) }} </td>
                                            <td>
                                                <span v-if="post.status=='published'" class="badge badge-primary">Publish</span>
                                                <span v-else class="badge badge-danger">Draft</span>
                                            </td>

                                            <td>
                                                <router-link :to="{name:'editCategory', params:{id: post.id}}" class="btn btn-sm btn-outline-info" >Edit</router-link>
                                                <button @click="removePost(post.id)" type="button" class="btn btn-sm btn-outline-danger">Delete</button>
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
            postIds: [],
            checkValue: false,
            select: 'noSelect',
        }
    },
    methods: {
        checkSelect(){
            setTimeout(() => {
                if(this.postIds.length == this.getPosts.length){

                    this.checkValue = true;
                }else{

                    this.checkValue = false;
                }
            }, 1);
        },
        removePost(id){
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
                    axios.delete(`/api/post/${id}`)
                    .then(() =>{
                        this.$store.dispatch("receivedPost");
                        toastr.success('Post deleted successfully');
                    })

                }
            })

        },
        check(){
            setTimeout(() => {
                if(this.checkValue==true){
                    this.postIds = [];
                    for (const post of this.getPosts) {
                        this.postIds.push(post.id);

                    }
                }else{
                    this.postIds=[];
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
                    for (const id of this.postIds) {
                        axios.delete(`/api/post/${id}`)
                        .then(() =>{
                            this.$store.dispatch("receivedPost");
                            this.postIds = []
                            this.select= 'noSelect'
                            this.checkValue = false;
                        })
                    }
                    toastr.success('Post deleted successfully');
                }
            })
            }else if(this.select == "selectActive"){
                let i = 0;
                for (const id of this.postIds) {
                    i++
                    axios.put(`/api/post/active/${id}`,{name:'Mamun'})
                    .then(() =>{
                        this.$store.dispatch("receivedPost");
                        this.postIds = []
                        this.select= 'noSelect'
                        this.checkValue = false;
                    })
                }
                toastr.success(i+' item has been changed to Publish');

            }else if(this.select == "selectInactive"){
                let i = 0;
                for (const id of this.postIds) {
                    i++
                    axios.put(`/api/post/inactive/${id}`,{name:'Mamun'})
                    .then(() =>{
                        this.$store.dispatch("receivedPost");
                        this.postIds = []
                        this.select= 'noSelect'
                        this.checkValue = false;
                    })
                }
                toastr.success(i+' item has been changed to Draft');

            }
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
        getPosts(){
            return this.$store.getters.posts;
        }
    },
    mounted() {
        this.$store.dispatch("receivedPost");
    },
};
</script>

<style>

</style>
