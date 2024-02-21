package Practice;

import java.io.IOException;
import java.net.URL;

import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;

public class Test1 {

	public static void main(String[] args) throws IOException {
		
	//	Runtime.getRuntime().exec("cmd.exe /c start cmd.exe /k \"appium\"");
	//	URL u= new URL("http://0.0.0.0/4724/wd/hub");
		DesiredCapabilities dc= new DesiredCapabilities();
		dc.setCapability(CapabilityType.BROWSER_NAME,"");
		dc.setCapability("deviceName","emulator-5554");
		dc.setCapability("platformName", "Android");
		dc.setCapability("PlatformVersion", "12");
		dc.setCapability("automationName", "uiautomator2");
		dc.setCapability("appPackage", "com.android.dialer");
		dc.setCapability("appActivity","com.android.dialer.main.impl.MainActivity");
		
		AppiumDriver driver=new AndroidDriver(dc);
	/*	AppiumDriver driver;
		
		while(2>1)
		{
			try {
				driver=new AndroidDriver(u,dc);
				break;
			}
			catch(Exception e)
			{
				
			}
		}*/
		

	}

}
