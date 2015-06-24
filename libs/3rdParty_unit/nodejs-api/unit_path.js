var unit;
(function (unit) {
    unit.curRegisterModule = "3rdParty";
    unit.registerTestBtn("path.join", function () {
        console.debug(path.join("a", "b", "c", "d.png"));
        console.debug(path.join("/a/", "/b", "c/", "d.png"));
        console.debug(path.join("\\a\\", "\\b", "c\\", "d.png"));
        console.debug(path.join("d.png"));
    });
    unit.registerTestBtn("path.extname", function () {
        console.debug(path.extname("d.png"));
        console.debug(path.extname("a/b/c/d.png"));
        console.debug(path.extname("a\\b\\c\\d.png"));
        console.debug(path.extname("d.Png"));
    });
    unit.registerTestBtn("path.basename", function () {
        console.debug(path.basename("a/b/c/d.png"));
        console.debug(path.basename("a/b/c/d.png", ".png"));
        console.debug(path.basename("a/b/c/d.png", ".Png"));
        console.debug(path.basename("a\\b\\c\\d.png", ".png"));
        console.debug(path.basename("a/b/c/d.png", "png"));
    });
    unit.registerTestBtn("path.dirname", function () {
        console.debug(path.dirname("a/b/c/d.png"));
        console.debug(path.dirname("a\\b\\c\\d.png"));
    });
    unit.registerTestBtn("path.relative", function () {
        console.debug(path.relative("a", "a"));
        console.debug(path.relative("a", "a/"));
        console.debug(path.relative("a/", "a"));
        console.debug(path.relative("a", "a/b/c/d/e.png"));
        console.debug(path.relative("a/b/c", "a/b/c/d/e.png"));
        console.debug(path.relative("a/b/c/", "a/b/c/d/e.png"));
        console.debug(path.relative("a\\b\\\\c/", "a/b/c/d/e.png"));
    });
    unit.registerTestBtn("path2.changeExtname", function () {
        console.debug(path2.changeExtname("a/b/c/d.png", ".jpg"));
        console.debug(path2.changeExtname("a/b/c/d.png", ".Jpg"));
        console.debug(path2.changeExtname("a/b/c/d.png", "jpg"));
        console.debug(path2.changeExtname("a/b/c/d.png"));
        console.debug(path2.changeExtname("a\\b\\c\\d.png", ".jpg"));
    });
    unit.registerTestBtn("path2.changeBasename", function () {
        console.debug(path2.changeBasename("a/b/c/d.png", "f.jpg"));
        console.debug(path2.changeBasename("a/b/c/d.png", "f.Jpg"));
        console.debug(path2.changeBasename("a/b/c/d.png", ".jpg"));
        console.debug(path2.changeBasename("a/b/c/d.png", "f"));
        console.debug(path2.changeBasename("a\\b\\c\\d.png", "f.jpg"));
    });
})(unit || (unit = {}));
