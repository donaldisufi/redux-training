import { Model, Server } from "miragejs";

new Server({
    models: {
        blog: Model,
    },
    seeds(server) {
        server.schema.blogs.create({
            id: 1,
            title: "Blog 01",
            description: "Blog Description",
        })
        server.schema.blogs.create({
            id: 2,
            title: "Blog 02",
            description: "Blog Description 02",
        })
        server.schema.blogs.create({
            id: 3,
            title: "Blog 03",
            description: "Blog Description 03 ",
        })
    },
    routes() {
        this.namespace = "/api"

        /*
        *
        * Blog Endpoints
         */

        this.get("/blogs", (schema) => {
            return schema.blogs.all();
        });

        this.post("/blogs", (schema, request) => {
           return schema.blogs.create(JSON.parse(request.requestBody));
        });

        this.del("/blogs/:id", (schema, request) => {
            let id = request.params.id;
            let item = schema.blogs.find(parseInt(id));

            if(item){
                item.destroy(); // removed from the db
                return {status: true};
            }
            return {status: false};
        });
    },
});