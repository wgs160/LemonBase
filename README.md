# lemon
> vue+webpack+node+express+gulp+mysql������

## webpack���

# ��gulp����less�������Ȳ���
gulp watch

## ��ʱ����
# webpack �Ȳ��� localhost:8080
npm run hot

# ���ѹ��
npm run build
```

# ��������node����󣬽���client����webpack�Ȳ��𿪷�

## node�������

���ذ�װ node.js�� Linux��Ҫ���밲װ�������ԡ����ص�ַ��http://nodejs.org/download/


���ô��� 

	npm config set proxy=http://10.19.110.31:8080
	npm config set https-proxy=http://10.19.110.31:8080

��װ�������������ȫ��ģ��	

	npm install supervisor -g
	npm install forever -g

��ӻ�������

	NODE_ENV=prd �� pre �� sit

*�����������Բ���Ӹû���������Ĭ��Ϊdev*

����������������

	supervisor -e js ./bin/www


## �����������

��װ
npm install body-parser cookie-parser express serve-favicon express-session morgan mysql moment --save


�ڿ���������λ�ȡ���ݵĸ������

	·�ɴ��ݵĲ�����req.params
	post�Ĳ�����req.body
	get�Ĳ�����req.query

���� cookie

	res.cookie('name', 'tobi', { path: '/', expires: new Date(Date.now() + 900000), httpOnly: true });
	res.cookie('name', 'tobi', { signed: true }); // ����ǩ����cookie����ֹ�ͻ��˴۸�


��ȡ cookie

	req.cookies.name;
	req.signedCookies.name;

ɾ�� cookie

	res.clearCookie('name', { path: '/' });

���� session

	req.session.user = {name : 'pangnate'};

��ȡ session

	req.session.user;

ɾ�� session
	
	req.session.destroy(function(){});  // ��� session
	req.session.destroy(key, function(){});  // ɾ������ session

