package Practice;
import java.io.File;
import java.io.IOException;
import java.util.*;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Dynamic_Values {

	public static void main(String[] args) throws InterruptedException, IOException {
		System.setProperty("webdriver.chrome.driver", "D:\\Chrome\\chromedriver.exe");
		ChromeDriver driver=new ChromeDriver();
		driver.get("https://www.worldometers.info/coronavirus/#google_vignette");
		Thread.sleep(5000);
		//String n=driver.findElement(By.xpath("(//table[@id='main_table_countries_today']//tbody//tr//td/a[text()=\"India\"])/following::td[text()]")).getText();
		String n=driver.findElement(By.xpath("(//table[@id='main_table_countries_today']//tbody//tr//td/a[text()=\"USA\"])/following::td[text()]")).getText();

		System.out.println(n);
		File src=driver.getScreenshotAs(OutputType.FILE);
		File dest=new File("D:\\macu\\MACU_POC\\resources\\config\\test_execution\\screen.png");
		FileUtils.copyFile(src, dest);
		
	}

}
