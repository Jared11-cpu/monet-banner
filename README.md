# monet-banner

在 Claude Code 输入框上方显示莫奈《撑阳伞的女人：莫奈夫人和她的儿子》（1875）画作横幅。桌面端 Code 页显示为图片横幅；终端支持图片时也会显示。

## 安装

```
claude plugin marketplace add Jared11-cpu/monet-banner
claude plugin install monet-banner@monet-banner
```

装好后新开一个会话即可看到。输入 `/monet` 可以隐藏或重新显示横幅。

## 卸载

```
claude plugin uninstall monet-banner@monet-banner
claude plugin marketplace remove monet-banner
```

## 文件

- `hooks/register.tsx`：扩展本体，只做两件事：画横幅、注册 `/monet` 命令
- `hooks/art.ts`：由 `tools/make_art.py` 从画作生成的图片数据
- `hooks/banner.test.ts`：测试，用 `claude plugin test .` 运行

画作：Claude Monet, *Woman with a Parasol – Madame Monet and Her Son*, 1875，美国国家美术馆藏，公有领域。
