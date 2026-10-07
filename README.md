# monet-banner

给 Claude 桌面端 Code 页的对话消息换上莫奈《撑阳伞的女人：莫奈夫人和她的儿子》（1875）画中的颜色：你的消息是画布奶油色底、天空蓝圆角边框，Claude 的回复是淡天空蓝底、阳伞绿边框。终端不受影响。

## 安装

```
claude plugin marketplace add https://github.com/Jared11-cpu/monet-banner.git
claude plugin install monet-banner@monet-banner
```

装好后新开一个会话即可看到。输入 `/monet` 可以关闭或重新开启配色。

## 更新

```
claude plugin marketplace update monet-banner
claude plugin update monet-banner@monet-banner
```

## 卸载

```
claude plugin uninstall monet-banner@monet-banner
claude plugin marketplace remove monet-banner
```

## 文件

- `hooks/register.tsx`：扩展本体，给桌面端消息上色、注册 `/monet` 命令
- `hooks/banner.test.ts`：测试，用 `claude plugin test .` 运行
