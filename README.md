# Word-Punching
背单词打卡用



### usage

```bash
# 在punching子目录下
docker build -t wordpunching:(version) .
docker run -dt -p (external-port):3000 --name="wordpunching" wordpunching:(version)
# 查看container日志
docker logs --since 30m CONTAINER_ID
```

