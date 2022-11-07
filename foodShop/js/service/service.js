//async говорим что нутки ф буд какой- асинхроннный код
const postData = async (url, data) => {
  let res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
  // await будет ждать окончания запроса
  return await res.json();
};

// настраиваем получение данных по запросу
const getResourse = async (url) => {
  // await будет ждать окончания запроса
  const res = await fetch(url);

  // проверяем на ошибки
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status${res.status}`);
  }

  // await будет ждать окончания запроса
  return await res.json();
};

export { postData };
export { getResourse };
