class Footer {    
    static render() {
        const footer = document.createElement('footer');
        footer.innerHTML = `<div class="white_lane"></div>
                            <div class="wrapper">
                                <div class="footer_info_wrapper">
                                    <a href="https://rs.school/js/" class="RSS_logo">RSSchool</a>
                                    <a href="https://github.com/4Quark" class="github_logo">GitHub</a>
                                    <a>© Rolling Scopes School, 2022</a>
                                </div>
                            </div>`;
        return footer;
    }
}

export default Footer;
