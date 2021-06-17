<template>
    <div>
        <!-- Main content -->
        <section class="content pt-3">
            <div class="container-fluid">
                <div class="row no-gutters">
                    <div class="col-md-8 offset-md-2">
                        <div class="card card-info">
                            <div class="card-header ">
                                <h3 class="card-title ">Add new category</h3>
                                <router-link to="/categories" class="btn btn-sm btn-dark float-right">Back</router-link>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body p-0">

                                    <form @submit.prevent="create" class="form-horizontal">
                                        <div class="card-body">
                                            <div class="form-group row">
                                                <label for="name" class="col-sm-3 col-form-label">Category name</label>
                                                <div class="col-sm-9">
                                                    <input v-model="form.name" type="text" class="form-control" id="name"
                                                        placeholder="Enter category name">
                                                    <div class="text-danger" v-if="form.errors.has('name')" v-html="form.errors.get('name')" />
                                                </div>

                                            </div>
                                            <div class="form-group row">
                                                <label for="staus" class="col-sm-3 col-form-label">Status</label>
                                                <div class="col-sm-9">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" v-model="form.status" id="inlineRadio1" value="1" checked>
                                                        <label class="form-check-label" for="inlineRadio1">Active</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" v-model="form.status" id="inlineRadio2" value="0" >
                                                        <label class="form-check-label" for="inlineRadio2">Inactive</label>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <!-- /.card-body -->
                                        <div class="card-footer">
                                            <button type="submit" class="btn btn-primary">Create</button>
                                            <button @click="clearForm" type="reset" class="btn btn-default float-right">Cancel</button>
                                        </div>
                                        <!-- /.card-footer -->
                                    </form>

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
import Form from 'vform'
    export default {
        data: () => ({
            form: new Form({
            name: null,
            status: 1,
            })
        }),

        methods: {
            async create () {
            const response = await this.form.post('/category')
            if(response.status == 200){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your data has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.form.name = null;

            }
            },
            clearForm(){
                this.form.name = null;
            }
        }
    };

</script>

<style></style>
