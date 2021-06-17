<template>
    <div>
        <!-- Main content -->
        <section class="content pt-3">
            <div class="container-fluid">
                <div class="row no-gutters">
                    <div class="col-md-8 offset-md-2">
                        <div class="card">
                            <div class="card-header ">
                                <h3 class="card-title ">Categories</h3>
                                <router-link to="/add-category" class="btn btn-sm btn-info float-right">Add Category</router-link>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body p-0">
                                <table class="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1.</td>
                                            <td>Update software</td>
                                            <td>
                                                <span class="badge bg-danger">55%</span
                                                >
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
export default {};
</script>

<style></style>
