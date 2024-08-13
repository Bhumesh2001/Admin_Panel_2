const sidebar = document.getElementById("sidebar");
const sidebarBtn = document.getElementById('toggleSidebar');
document.getElementById("toggleSidebar").addEventListener("click", function () {
    sidebar.classList.toggle("show");
    sidebarBtn.classList.add('d-none');
});

document.addEventListener('click', function (event) {
    if (!sidebar.contains(event.target) && !sidebarBtn.contains(event.target)) {
        sidebar.classList.remove('show');
        setTimeout(() => {
            sidebarBtn.classList.remove('d-none');
            sidebarBtn.classList.add('d-block');
        }, 100);
    }
});

document.querySelectorAll(".nav-link").forEach(function (navLink) {
    navLink.addEventListener("click", function (event) {
        event.preventDefault();
        document.querySelectorAll("#content > div").forEach(function (page) {
            page.classList.add("d-none");
        });
        const target = event.target.getAttribute("data-target");
        document.querySelector(target).classList.remove("d-none");
    });
});

document.querySelectorAll(".sidebar-link").forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        document.querySelectorAll(".sidebar-link").forEach(function (link) {
            link.classList.remove("active");
        });
        link.classList.add("active");

        sidebar.classList.remove("show");
        sidebarBtn.classList.remove("d-none");
    });
});

document.querySelector('.sidebar-link[data-target="#dashboard"]').click();

document.getElementById('video-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const videoFile = document.getElementById('videoUpload').files[0];
    const videoUrl = document.getElementById('videoUrl').value;
    const videoTitle = document.getElementById('videoTitle').value;
    const videoDescription = document.getElementById('videoDescription').value;
    const category = document.getElementById('videoCategory').value;

    if (videoFile) {
        const formData = new FormData();
        formData.append('videoUpload', videoFile);
        formData.append('videoTitle', videoTitle);
        formData.append('videoDescription', videoDescription);
        formData.append('videoCategory', category);
        formData.append('videoUrl',videoUrl);
        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            console.log('Server Response:', result);
            if (result.success) {
                document.getElementById('video-form').reset();
            } else {
                alert('Failed to upload video.');
            };
        } catch (error) {
            console.error('Error sending video to server:', error);
        };
    } else {
        alert('please upload video file');
    };
});