package Mobile;

import java.net.URL;

import org.openqa.selenium.By;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.service.local.AppiumDriverLocalService;
import io.appium.java_client.service.local.AppiumServiceBuilder;

public class kid_secure2 {
     private static AppiumDriverLocalService service;
    
	public static void main(String[] args) throws InterruptedException {
		AppiumServiceBuilder builder=new AppiumServiceBuilder();
		builder.usingAnyFreePort();
		builder.withArgument(() -> "--log-level","debug");
		service=AppiumDriverLocalService.buildService(builder);
		service.start(); 
		URL u=service.getUrl();
		
		DesiredCapabilities dc=new DesiredCapabilities();
		dc.setCapability(CapabilityType.BROWSER_NAME, "");
		dc.setCapability("deviceName", "emulator-5554");
		dc.setCapability("platformName", "Android");
		dc.setCapability("platVersion", "12");
		dc.setCapability("automationName", "uiautomator2");
		dc.setCapability("appPackage","com.unfoldlabs.kidsecure");
		dc.setCapability("appActivity", "com.unfoldlabs.kidsecure.ui.SplashActivity");
		AndroidDriver driver;
		while(2>1) {
			try {
				driver = new AndroidDriver(u,dc);
				break;
			}
			catch(Exception e) {
			   	
			}
		}
		Thread.sleep(10000);
		driver.findElement(By.xpath("(//*[@resource-id='com.unfoldlabs.kidsecure:id/tv_location'])[1]")).click();
		Thread.sleep(5000);
		try {
			driver.findElement(By.xpath("//*[@text='Next']")).click();
			Thread.sleep(5000);
			driver.findElement(By.xpath("//*[@text='Next']")).click();
			Thread.sleep(5000);
			driver.findElement(By.xpath("//*[@text='Got it']")).click();
			Thread.sleep(5000);
			driver.findElement(By.xpath("//*[@text='KidSecure']")).click();
			Thread.sleep(5000);
			driver.findElement(By.xpath("//*[@resource-id='android:id/switch_widget']")).click();
			Thread.sleep(5000);
			driver.navigate().back();
			Thread.sleep(5000);
			driver.navigate().back();	
			Thread.sleep(5000);
		}
		catch(Exception e) {
		
		
		}
		driver.findElement(By.xpath("(//*[@resource-id='com.unfoldlabs.kidsecure:id/tv_location'])[2]")).click();
		Thread.sleep(5000);
	    try {
		//driver.findElement(By.xpath("//*[@text='Next']")).click();
		//Thread.sleep(5000);
	//	driver.findElement(By.xpath("//*[@text='Next']")).click();
		Thread.sleep(5000);
		driver.findElement(By.xpath("//*[@text='Got it']")).click();
		Thread.sleep(5000);
		driver.findElement(By.xpath("//*[@text='KidSecure']")).click();
		Thread.sleep(5000);
		driver.findElement(By.xpath("//*[@resource-id='android:id/switch_widget']")).click();
		Thread.sleep(5000);
		driver.navigate().back();
		Thread.sleep(5000);
		driver.navigate().back();	
		Thread.sleep(5000);
	    }
	    catch(Exception e) {
	    	
	    }
		
		
		Thread.sleep(5000);
		driver.findElement(By.xpath("//*[@text='Continue']")).click();
		
	}
	  
}
