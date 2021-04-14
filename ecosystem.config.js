module.exports = {
    apps: [{
        name: 'stomp-web',
        script: './start.js',
        max_memory_restart: "1G",
        autorestart: true,
        node_args: [],
        args: [],
        cwd: "./",
        instance_var: "INSTANCE_ID",
        exec_mode : "cluster",
        instances: 4,
        watch: [
            "server",
        ],
        ignore_watch: [
            "node_modules",
            "logs"
        ],
        error_file: "./logs/stomp-web-err.log",
        out_file: "./logs/stomp-web-out.log",
        log_date_format: "YYYY-MM-DD HH:mm Z",
        merge_logs: true,
        watch: true,
    }]
}
