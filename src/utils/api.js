import { Model, Server } from "miragejs";

const BLOGS_PER_PAGE = 5;
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
        server.schema.blogs.create({
            id: 4,
            title: "Blog 04",
            description: "Blog Description 04 ",
        })
        server.schema.blogs.create({
            id: 5,
            title: "Blog 05",
            description: "Blog Description 05 ",
        })
        server.schema.blogs.create({
            id: 6,
            title: "Blog 06",
            description: "Blog Description 6 ",
        })
        server.schema.blogs.create({
            id: 7,
            title: "Blog 07",
            description: "Blog Description 7 ",
        })
    },
    routes() {
        this.namespace = "/api"

        /*
        *
        * Blog Endpoints
         */

        this.get("/blogs/:page", (schema, request) => {
            const page = parseInt(request.params.page);
            const allBlogs = schema.blogs.all();
            const from = (page - 1) * BLOGS_PER_PAGE;
            const to = page * BLOGS_PER_PAGE;
            const result = allBlogs.models.slice(from, to);
            console.log('result', result);
            return { blogs: result, hasMore: result.length >= BLOGS_PER_PAGE};
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