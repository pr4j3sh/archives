from selenium import webdriver


options = webdriver.ChromeOptions()
print(options)
driver = webdriver.Chrome()

driver.get("http://selenium.dev")

title = driver.title

print(title)

driver.implicitly_wait(0.5)

# driver.quit()
