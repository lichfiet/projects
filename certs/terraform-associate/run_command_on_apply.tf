provider "local" {
}

resource "null_resource" "test" {

    provisioner "local-exec" {
      command = "ls > directory_contents.txt"
    }
}